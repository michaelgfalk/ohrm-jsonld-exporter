import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class html extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    title: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    creator: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    copyright: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    webaddress: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    bgcolor: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    bgimage: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    link: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    vlink: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    alink: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    logo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    logoatt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    bar: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    home: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    browse: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    browseatt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    browsepage: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    browseprefix: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    x_search: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    searchatt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    searchpage: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    prev: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    prevatt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    x_next: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    nextatt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sponspage: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    spons: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    sponsatt: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    datemod: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    datecreated: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    pubby: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pubbypage: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pubon: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pubonpage: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    pubdate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    prepby: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    prepbymail: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    extra: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dirbiog: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dirarc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dirpub: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dirbrowse: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dirspons: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    citstyle: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    googlesearch: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    stylesheet: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    dynamicbib: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dynamicbibhome: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dynamicbibname: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    altcolour: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    defaultstylesheet: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    fgcolor: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    includeref: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dobjects: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    generateoption: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    staticbib: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    reverseauthor: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    includesumnote: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    template: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    externallinknewwindow: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    arcpagename: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    pubpagename: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dirgallery: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    gallerypagename: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    gallerystyle: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    galleryorderby: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    galleryorderbydirection: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    dirdobject: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    dobjectpagename: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    onlinepagename: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    functionpagename: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    categorypagename: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    browselimit: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    functionlistgrouped: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    templatefile: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    resultstemplatefile: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    entitypagename: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    imageviewer: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    imageviewer_openattributes: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    entities: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dynamicentity: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    entityarc: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    entitypub: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    entitydobject: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    arcresources: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dynamicarcresource: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pubresources: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dynamicpubresource: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dynamicdobject: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    pubgallery: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    arcgallery: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    dobjectversions: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    maxurl: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    browsetemplatefile: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    dynamicwebaddress: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    searchentity: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    searcharc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    searchpub: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    searchdobject: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    incentitycategoriesandfunctions: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    incarcrepdetails: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    arcstyle: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'html',
    schema: 'public',
    timestamps: false
  });
  }
}
