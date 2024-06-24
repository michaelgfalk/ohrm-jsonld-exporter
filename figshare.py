import hashlib
import json
import os
from urllib.parse import urljoin

import requests

# From https://docs.figshare.com/#upload_files_example_upload_on_figshare
# TODO: Get rid of Python 2 nonsense. Rename/parameterise main() and make
# all other functions private.

CHUNK_SIZE = 1048576

def upload_article_to_figshare(metadata: dict, file_path: str, base_url: str, token: str):
    global BASE_URL, TOKEN
    BASE_URL = urljoin(base_url, "{endpoint}")
    TOKEN = token
    # We first create the article
    _list_articles()
    article_id = _create_article(metadata)
    _list_articles()
    _list_files_of_article(article_id)

    # Then we upload the file.
    file_info = _initiate_new_upload(article_id, file_path)
    # Until here we used the figshare API; following lines use the figshare upload service API.
    _upload_parts(file_info, file_path)
    # We return to the figshare API to complete the file upload process.
    _complete_upload(article_id, file_info['id'])
    _list_files_of_article(article_id)


def _raw_issue_request(method, url, data=None, binary=False):
    headers = {'Authorization': 'token ' + TOKEN}
    if data is not None and not binary:
        data = json.dumps(data)
    response = requests.request(method, url, headers=headers, data=data)
    try:
        response.raise_for_status()
        try:
            data = json.loads(response.content)
        except ValueError:
            data = response.content
    except requests.exceptions.HTTPError as error:
        breakpoint()
        print('Caught an HTTPError: {}'.format(error.message))
        print('Body:\n', response.content)
        raise

    return data


def _issue_request(method, endpoint, *args, **kwargs):
    return _raw_issue_request(method, BASE_URL.format(endpoint=endpoint), *args, **kwargs)


def _list_articles():
    result = _issue_request('GET', 'account/articles')
    print('Listing current articles:')
    if result:
        for item in result:
            print('  {url} - {title}'.format(**item))
    else:
        print('  No articles.')
    print()


def _create_article(metadata: dict):
    result = _issue_request('POST', 'account/articles', data=metadata)
    print('Created article:', result['location'], '\n')

    result = _raw_issue_request('GET', result['location'])

    return result['id']


def _list_files_of_article(article_id):
    result = _issue_request('GET', 'account/articles/{}/files'.format(article_id))
    print('Listing files for article {}:'.format(article_id))
    if result:
        for item in result:
            print('  {id} - {name}'.format(**item))
    else:
        print('  No files.')

    print()


def _get_file_check_data(file_name):
    with open(file_name, 'rb') as fin:
        md5 = hashlib.md5()
        size = 0
        data = fin.read(CHUNK_SIZE)
        while data:
            size += len(data)
            md5.update(data)
            data = fin.read(CHUNK_SIZE)
        return md5.hexdigest(), size


def _initiate_new_upload(article_id, file_name):
    endpoint = 'account/articles/{}/files'
    endpoint = endpoint.format(article_id)

    md5, size = _get_file_check_data(file_name)
    data = {'name': os.path.basename(file_name),
            'md5': md5,
            'size': size}

    result = _issue_request('POST', endpoint, data=data)
    print('Initiated file upload:', result['location'], '\n')

    result = _raw_issue_request('GET', result['location'])

    return result


def _complete_upload(article_id, file_id):
    _issue_request('POST', 'account/articles/{}/files/{}'.format(article_id, file_id))


def _upload_parts(file_info: str, file_path: str):
    url = '{upload_url}'.format(**file_info)
    result = _raw_issue_request('GET', url)

    print('Uploading parts:')
    with open(file_path, 'rb') as fin:
        for part in result['parts']:
            _upload_part(file_info, fin, part)
    print()


def _upload_part(file_info, stream, part):
    udata = file_info.copy()
    udata.update(part)
    url = '{upload_url}/{partNo}'.format(**udata)

    stream.seek(part['startOffset'])
    data = stream.read(part['endOffset'] - part['startOffset'] + 1)

    _raw_issue_request('PUT', url, data=data, binary=True)
    print('  Uploaded part {partNo} from {startOffset} to {endOffset}'.format(**part))


