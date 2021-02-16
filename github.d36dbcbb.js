// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"github.js":[function(require,module,exports) {
// https://api.github.com/users/ma-zou/gists
window.onload = function () {
  getGists();
};

getGists = function getGists() {
  fetch("https://api.github.com/users/ma-zou/gists").then(function (res) {
    return res.json();
  }).then(function (gists) {
    var markup = '',
        container = document.querySelector('.embed_container');

    for (i = 0; i < gists.length; i++) {
      var wrapper = document.createElement('div'),
          filename = document.createElement('button');
      filename.dataset.gist = gists[i].url;
      filename.dataset.tag = '<button>';
      filename.innerText = gists[i].files[Object.keys(gists[i].files)[0]].filename;
      wrapper.append(filename);
      console.log(gists[i].description);

      if (gists[i].description) {
        var description = document.createElement('span');
        description.innerText = gists[i].description;
        filename.append(description);
      }

      wrapper.addEventListener('click', openGist);
      container.append(wrapper);
    }
  });
};

function openGist(event) {
  var element = event.target;

  if (!element.classList.contains('gist_loaded')) {
    fetch(element.dataset.gist).then(function (res) {
      return res.json();
    }).then(function (gist) {
      var pre = document.createElement('pre'),
          code = document.createElement('code'),
          copyButton = document.createElement('button');
      copyButton.copyContent = gist.files[Object.keys(gist.files)[0]].content;
      copyButton.classList.add('button');
      copyButton.addEventListener('click', copyToClipboard);
      copyButton.innerText = "Code kopieren";
      pre.append(code);
      code.innerHTML = gist.files[Object.keys(gist.files)[0]].content.replaceAll('<', '&lt;');
      element.classList.add('gist_loaded');
      element.classList.add('hide');
      element.parentElement.append(pre);
      element.parentElement.append(copyButton);
      setTimeout(function () {
        element.classList.remove('hide');
      }, 10);
      w3CodeColor(code, 'js');
    });
  } else if (element.classList.contains('hide')) {
    console.log(element.nextElementSibling);
    element.nextElementSibling.style.maxHeight = "2000px";
    element.classList.remove('hide');
    setTimeout(function () {
      element.nextElementSibling.style.maxHeight = "";
    }, 300);
  } else {
    element.classList.add('hide');
  }
}

function copyToClipboard(event) {
  var tmpInput = document.createElement('textarea');
  tmpInput.value = event.target.copyContent;
  document.body.append(tmpInput);
  tmpInput.select();
  tmpInput.setSelectionRange(0, 99999);
  document.execCommand("copy");
  tmpInput.remove();
}

function w3CodeColor(elmnt, mode) {
  var lang = mode || "html";
  var elmntObj = document.getElementById(elmnt) || elmnt;
  var elmntTxt = elmntObj.innerHTML;
  var tagcolor = "mediumblue";
  var tagnamecolor = "brown";
  var attributecolor = "red";
  var attributevaluecolor = "mediumblue";
  var commentcolor = "#acacac";
  var cssselectorcolor = "brown";
  var csspropertycolor = "red";
  var csspropertyvaluecolor = "mediumblue";
  var cssdelimitercolor = "black";
  var cssimportantcolor = "red";
  var jscolor = "#101010";
  var jskeywordcolor = "#9db3e1";
  var jsstringcolor = "#60cbc2";
  var jsnumbercolor = "red";
  var jspropertycolor = "#60cbc2";

  if (!lang) {
    lang = "html";
  }

  if (lang == "html") {
    elmntTxt = htmlMode(elmntTxt);
  }

  if (lang == "css") {
    elmntTxt = cssMode(elmntTxt);
  }

  if (lang == "js") {
    elmntTxt = jsMode(elmntTxt);
  }

  elmntObj.innerHTML = elmntTxt;

  function extract(str, start, end, func, repl) {
    var s,
        e,
        d = "",
        a = [];

    while (str.search(start) > -1) {
      s = str.search(start);
      e = str.indexOf(end, s);

      if (e == -1) {
        e = str.length;
      }

      if (repl) {
        a.push(func(str.substring(s, e + end.length)));
        str = str.substring(0, s) + repl + str.substr(e + end.length);
      } else {
        d += str.substring(0, s);
        d += func(str.substring(s, e + end.length));
        str = str.substr(e + end.length);
      }
    }

    this.rest = d + str;
    this.arr = a;
  }

  function htmlMode(txt) {
    var rest = txt,
        done = "",
        php,
        comment,
        angular,
        startpos,
        endpos,
        note,
        i;
    comment = new extract(rest, "&lt;!--", "--&gt;", commentMode, "W3HTMLCOMMENTPOS");
    rest = comment.rest;

    while (rest.indexOf("&lt;") > -1) {
      note = "";
      startpos = rest.indexOf("&lt;");

      if (rest.substr(startpos, 9).toUpperCase() == "&LT;STYLE") {
        note = "css";
      }

      if (rest.substr(startpos, 10).toUpperCase() == "&LT;SCRIPT") {
        note = "javascript";
      }

      endpos = rest.indexOf("&gt;", startpos);

      if (endpos == -1) {
        endpos = rest.length;
      }

      done += rest.substring(0, startpos);
      done += tagMode(rest.substring(startpos, endpos + 4));
      rest = rest.substr(endpos + 4);

      if (note == "css") {
        endpos = rest.indexOf("&lt;/style&gt;");

        if (endpos > -1) {
          done += cssMode(rest.substring(0, endpos));
          rest = rest.substr(endpos);
        }
      }

      if (note == "javascript") {
        endpos = rest.indexOf("&lt;/script&gt;");

        if (endpos > -1) {
          done += jsMode(rest.substring(0, endpos));
          rest = rest.substr(endpos);
        }
      }
    }

    rest = done + rest;

    for (i = 0; i < comment.arr.length; i++) {
      rest = rest.replace("W3HTMLCOMMENTPOS", comment.arr[i]);
    }

    return rest;
  }

  function tagMode(txt) {
    var rest = txt,
        done = "",
        startpos,
        endpos,
        result;

    while (rest.search(/(\s|<br>)/) > -1) {
      startpos = rest.search(/(\s|<br>)/);
      endpos = rest.indexOf("&gt;");

      if (endpos == -1) {
        endpos = rest.length;
      }

      done += rest.substring(0, startpos);
      done += attributeMode(rest.substring(startpos, endpos));
      rest = rest.substr(endpos);
    }

    result = done + rest;
    result = "<span style=color:" + tagcolor + ">&lt;</span>" + result.substring(4);

    if (result.substr(result.length - 4, 4) == "&gt;") {
      result = result.substring(0, result.length - 4) + "<span style=color:" + tagcolor + ">&gt;</span>";
    }

    return "<span style=color:" + tagnamecolor + ">" + result + "</span>";
  }

  function attributeMode(txt) {
    var rest = txt,
        done = "",
        startpos,
        endpos,
        singlefnuttpos,
        doublefnuttpos,
        spacepos;

    while (rest.indexOf("=") > -1) {
      endpos = -1;
      startpos = rest.indexOf("=");
      singlefnuttpos = rest.indexOf("'", startpos);
      doublefnuttpos = rest.indexOf('"', startpos);
      spacepos = rest.indexOf(" ", startpos + 2);

      if (spacepos > -1 && (spacepos < singlefnuttpos || singlefnuttpos == -1) && (spacepos < doublefnuttpos || doublefnuttpos == -1)) {
        endpos = rest.indexOf(" ", startpos);
      } else if (doublefnuttpos > -1 && (doublefnuttpos < singlefnuttpos || singlefnuttpos == -1) && (doublefnuttpos < spacepos || spacepos == -1)) {
        endpos = rest.indexOf('"', rest.indexOf('"', startpos) + 1);
      } else if (singlefnuttpos > -1 && (singlefnuttpos < doublefnuttpos || doublefnuttpos == -1) && (singlefnuttpos < spacepos || spacepos == -1)) {
        endpos = rest.indexOf("'", rest.indexOf("'", startpos) + 1);
      }

      if (!endpos || endpos == -1 || endpos < startpos) {
        endpos = rest.length;
      }

      done += rest.substring(0, startpos);
      done += attributeValueMode(rest.substring(startpos, endpos + 1));
      rest = rest.substr(endpos + 1);
    }

    return "<span style=color:" + attributecolor + ">" + done + rest + "</span>";
  }

  function attributeValueMode(txt) {
    return "<span style=color:" + attributevaluecolor + ">" + txt + "</span>";
  }

  function commentMode(txt) {
    return "<span style=color:" + commentcolor + ">" + txt + "</span>";
  }

  function cssMode(txt) {
    var rest = txt,
        done = "",
        s,
        e,
        comment,
        i,
        midz,
        c,
        cc;
    comment = new extract(rest, /\/\*/, "*/", commentMode, "W3CSSCOMMENTPOS");
    rest = comment.rest;

    while (rest.search("{") > -1) {
      s = rest.search("{");
      midz = rest.substr(s + 1);
      cc = 1;
      c = 0;

      for (i = 0; i < midz.length; i++) {
        if (midz.substr(i, 1) == "{") {
          cc++;
          c++;
        }

        if (midz.substr(i, 1) == "}") {
          cc--;
        }

        if (cc == 0) {
          break;
        }
      }

      if (cc != 0) {
        c = 0;
      }

      e = s;

      for (i = 0; i <= c; i++) {
        e = rest.indexOf("}", e + 1);
      }

      if (e == -1) {
        e = rest.length;
      }

      done += rest.substring(0, s + 1);
      done += cssPropertyMode(rest.substring(s + 1, e));
      rest = rest.substr(e);
    }

    rest = done + rest;
    rest = rest.replace(/{/g, "<span style=color:" + cssdelimitercolor + ">{</span>");
    rest = rest.replace(/}/g, "<span style=color:" + cssdelimitercolor + ">}</span>");

    for (i = 0; i < comment.arr.length; i++) {
      rest = rest.replace("W3CSSCOMMENTPOS", comment.arr[i]);
    }

    return "<span style=color:" + cssselectorcolor + ">" + rest + "</span>";
  }

  function cssPropertyMode(txt) {
    var rest = txt,
        done = "",
        s,
        e,
        n,
        loop;

    if (rest.indexOf("{") > -1) {
      return cssMode(rest);
    }

    while (rest.search(":") > -1) {
      s = rest.search(":");
      loop = true;
      n = s;

      while (loop == true) {
        loop = false;
        e = rest.indexOf(";", n);

        if (rest.substring(e - 5, e + 1) == "&nbsp;") {
          loop = true;
          n = e + 1;
        }
      }

      if (e == -1) {
        e = rest.length;
      }

      done += rest.substring(0, s);
      done += cssPropertyValueMode(rest.substring(s, e + 1));
      rest = rest.substr(e + 1);
    }

    return "<span style=color:" + csspropertycolor + ">" + done + rest + "</span>";
  }

  function cssPropertyValueMode(txt) {
    var rest = txt,
        done = "",
        s;
    rest = "<span style=color:" + cssdelimitercolor + ">:</span>" + rest.substring(1);

    while (rest.search(/!important/i) > -1) {
      s = rest.search(/!important/i);
      done += rest.substring(0, s);
      done += cssImportantMode(rest.substring(s, s + 10));
      rest = rest.substr(s + 10);
    }

    result = done + rest;

    if (result.substr(result.length - 1, 1) == ";" && result.substr(result.length - 6, 6) != "&nbsp;" && result.substr(result.length - 4, 4) != "&lt;" && result.substr(result.length - 4, 4) != "&gt;" && result.substr(result.length - 5, 5) != "&amp;") {
      result = result.substring(0, result.length - 1) + "<span style=color:" + cssdelimitercolor + ">;</span>";
    }

    return "<span style=color:" + csspropertyvaluecolor + ">" + result + "</span>";
  }

  function cssImportantMode(txt) {
    return "<span style=color:" + cssimportantcolor + ";font-weight:bold;>" + txt + "</span>";
  }

  function jsMode(txt) {
    var rest = txt,
        done = "",
        esc = [],
        i,
        cc,
        tt = "",
        sfnuttpos,
        dfnuttpos,
        bfnuttpos,
        compos,
        comlinepos,
        keywordpos,
        keywordpos1,
        keywordpos2,
        numpos,
        mypos,
        dotpos,
        y;

    for (i = 0; i < rest.length; i++) {
      cc = rest.substr(i, 1);

      if (cc == "\\") {
        esc.push(rest.substr(i, 2));
        cc = "W3JSESCAPE";
        i++;
      }

      tt += cc;
    }

    rest = tt;
    y = 1;

    while (y == 1) {
      sfnuttpos = getPos(rest, "'", "'", jsStringMode);
      dfnuttpos = getPos(rest, '"', '"', jsStringMode);
      bfnuttpos = getPos(rest, '`', '`', jsStringMode);
      compos = getPos(rest, /\/\*/, "*/", commentMode);
      comlinepos = getPos(rest, /\/\//, "<br>", commentMode);
      numpos = getNumPos(rest, jsNumberMode);
      keywordpos = getKeywordPos("js", rest, jsKeywordMode);
      keywordpos1 = getSpecialKeywordPos("js", rest, jsSpecialKeywordMode1, ['this', 'return']);
      keywordpos2 = getSpecialKeywordPos("js", rest, jsSpecialKeywordMode2, ['class', 'constructor']);
      keywordpos3 = getSpecialKeywordPos("js", rest, jsSpecialKeywordMode3, ["    "]);
      dotpos = getDotPos(rest, jsPropertyMode);

      if (Math.max(numpos[0], sfnuttpos[0], dfnuttpos[0], bfnuttpos[0], compos[0], comlinepos[0], keywordpos[0], keywordpos1[0], keywordpos2[0], keywordpos3[0], dotpos[0]) == -1) {
        break;
      }

      mypos = getMinPos(numpos, sfnuttpos, dfnuttpos, bfnuttpos, compos, comlinepos, keywordpos, keywordpos1, keywordpos2, keywordpos3, dotpos);

      if (mypos[0] == -1) {
        break;
      }

      if (mypos[0] > -1) {
        done += rest.substring(0, mypos[0]);
        done += mypos[2](rest.substring(mypos[0], mypos[1]));
        rest = rest.substr(mypos[1]);
      }
    }

    rest = done + rest;

    for (i = 0; i < esc.length; i++) {
      rest = rest.replace("W3JSESCAPE", esc[i]);
    }

    return "<span style=color:" + jscolor + ">" + rest + "</span>";
  }

  function jsStringMode(txt) {
    return "<span style=color:" + jsstringcolor + ">" + txt + "</span>";
  }

  function jsKeywordMode(txt) {
    return "<span style=color:" + jskeywordcolor + ">" + txt + "</span>";
  }

  function jsSpecialKeywordMode2(txt) {
    return "<span style=color:" + jscolor + ">" + txt + "</span>";
  }

  function jsSpecialKeywordMode3(txt) {
    return "<span style=color:#dfdfdf>....</span>";
  }

  function jsSpecialKeywordMode1(txt) {
    return "<span style=color:" + jskeywordcolor + ";font-style:italic>" + txt + "</span>";
  }

  function jsNumberMode(txt) {
    return "<span style=color:" + jsnumbercolor + ">" + txt + "</span>";
  }

  function jsPropertyMode(txt) {
    return "<span style=color:" + jspropertycolor + ">" + txt + "</span>";
  }

  function getDotPos(txt, func) {
    var x,
        i,
        j,
        s,
        e,
        arr = [".", "<", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/", "-", "*", "|", "%"];
    s = txt.indexOf(".");

    if (s > -1) {
      x = txt.substr(s + 1);

      for (j = 0; j < x.length; j++) {
        cc = x[j];

        for (i = 0; i < arr.length; i++) {
          if (cc.indexOf(arr[i]) > -1) {
            e = j;
            return [s + 1, e + s + 1, func];
          }
        }
      }
    }

    return [-1, -1, func];
  }

  function getMinPos() {
    var i,
        arr = [];

    for (i = 0; i < arguments.length; i++) {
      if (arguments[i][0] > -1) {
        if (arr.length == 0 || arguments[i][0] < arr[0]) {
          arr = arguments[i];
        }
      }
    }

    if (arr.length == 0) {
      arr = arguments[i];
    }

    return arr;
  }

  function getKeywordPos(typ, txt, func) {
    var words,
        i,
        pos,
        rpos = -1,
        rpos2 = -1,
        patt;

    if (typ == "js") {
      words = ["abstract", "arguments", "boolean", "break", "byte", "case", "catch", "char", "const", "continue", "debugger", "default", "delete", "do", "double", "else", "enum", "eval", "export", "extends", "false", "final", "finally", "float", "for", "function", "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", "let", "long", "NaN", "native", "new", "null", "package", "private", "protected", "public", "short", "static", "super", "switch", "synchronized", "throw", "throws", "transient", "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"];
    }

    for (i = 0; i < words.length; i++) {
      pos = txt.indexOf(words[i]);

      if (pos > -1) {
        patt = /\W/g;

        if (txt.substr(pos + words[i].length, 1).match(patt) && txt.substr(pos - 1, 1).match(patt)) {
          if (pos > -1 && (rpos == -1 || pos < rpos)) {
            rpos = pos;
            rpos2 = rpos + words[i].length;
          }
        }
      }
    }

    return [rpos, rpos2, func];
  }

  function getSpecialKeywordPos(typ, txt, func, words) {
    var i,
        pos,
        rpos = -1,
        rpos2 = -1,
        patt;

    for (i = 0; i < words.length; i++) {
      pos = txt.indexOf(words[i]);

      if (pos > -1) {
        patt = /\W/g;

        if (txt.substr(pos + words[i].length, 1).match(patt) && txt.substr(pos - 1, 1).match(patt)) {
          if (pos > -1 && (rpos == -1 || pos < rpos)) {
            rpos = pos;
            rpos2 = rpos + words[i].length;
          }
        }
      }
    }

    return [rpos, rpos2, func];
  }

  function getPos(txt, start, end, func) {
    var s, e;
    s = txt.search(start);
    e = txt.indexOf(end, s + end.length);

    if (e == -1) {
      e = txt.length;
    }

    return [s, e + end.length, func];
  }

  function getNumPos(txt, func) {
    var arr = ["<br>", " ", ";", "(", "+", ")", "[", "]", ",", "&", ":", "{", "}", "/", "-", "*", "|", "%", "="],
        i,
        j,
        c,
        startpos = 0,
        endpos,
        word;

    for (i = 0; i < txt.length; i++) {
      for (j = 0; j < arr.length; j++) {
        c = txt.substr(i, arr[j].length);

        if (c == arr[j]) {
          if (c == "-" && (txt.substr(i - 1, 1) == "e" || txt.substr(i - 1, 1) == "E")) {
            continue;
          }

          endpos = i;

          if (startpos < endpos) {
            word = txt.substring(startpos, endpos);

            if (!isNaN(word)) {
              return [startpos, endpos, func];
            }
          }

          i += arr[j].length;
          startpos = i;
          i -= 1;
          break;
        }
      }
    }

    return [-1, -1, func];
  }
}
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "55811" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","github.js"], null)
//# sourceMappingURL=/github.d36dbcbb.js.map