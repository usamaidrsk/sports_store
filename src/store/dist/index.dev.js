"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var baseUrl = "http://localhost:3500";
var productsUrl = "".concat(baseUrl, "/products");
var categoriesUrl = "".concat(baseUrl, "/categories");

_vue["default"].use(_vuex["default"]); // const testData = [];
// for (let i = 1; i <= 10; i++) {
//     testData.push({
//         id: i,
//         name: `Product #${i}`, category: `Category ${i % 3}`,
//         description: `This is Product #${i}`,
//         price: i * 50
//     })
// }


var _default = new _vuex["default"].Store({
  strict: true,
  state: {
    products: [],
    categoriesData: [],
    productsTotal: 0,
    currentPage: 1,
    pageSize: 4,
    currentCategory: "All"
  },
  getters: {
    // processedProducts: state => {
    //     let index = (state.currentPage -1) * state.pageSize;
    //     return state.products.slice(index, index + state.pageSize);
    //     },
    // pageCount: state => Math.ceil(state.productsTotal / state.pageSize)
    productsFilteredByCategory: function productsFilteredByCategory(state) {
      return state.products.filter(function (p) {
        return state.currentCategory == "All" || p.category == state.currentCategory;
      });
    },
    processedProducts: function processedProducts(state, getters) {
      var index = (state.currentPage - 1) * state.pageSize;
      return getters.productsFilteredByCategory.slice(index, index + state.pageSize);
    },
    pageCount: function pageCount(state, getters) {
      return Math.ceil(getters.productsFilteredByCategory.length / state.pageSize);
    },
    // categories: state => ["All",...new Set(state.products.map(p => p.category).sort())]
    categories: function categories(state) {
      return ["All"].concat(_toConsumableArray(state.categoriesData));
    }
  },
  mutations: {
    // setCurrentPage(state, page) {
    //     state.currentPage = page;
    //     },
    setCurrentPage: function setCurrentPage(state, page) {
      state.currentPage = page;
    },
    setPageSize: function setPageSize(state, size) {
      state.pageSize = size;
      state.currentPage = 1;
    },
    setCurrentCategory: function setCurrentCategory(state, category) {
      state.currentCategory = category;
      state.currentPage = 1;
    },
    setData: function setData(state, data) {
      state.products = data.pdata;
      state.productsTotal = data.pdata.length;
      state.categoriesData = data.cdata.sort();
    }
  },
  actions: {
    getData: function getData(context) {
      var pdata, cdata;
      return regeneratorRuntime.async(function getData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(_axios["default"].get(productsUrl));

            case 2:
              pdata = _context.sent.data;
              _context.next = 5;
              return regeneratorRuntime.awrap(_axios["default"].get(categoriesUrl));

            case 5:
              cdata = _context.sent.data;
              context.commit("setData", {
                pdata: pdata,
                cdata: cdata
              });

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    }
  }
});

exports["default"] = _default;