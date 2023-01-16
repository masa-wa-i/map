const cv = document.getElementById("cv");
const c = cv.getContext("2d");
const s = document.getElementById("wa");

s.innerHTML = "";
let ajax = new XMLHttpRequest();
let map = [];
let map_ob = [];

ajax.open("GET", "rpg.map");
ajax.send();
ajax.onreadystatechange = function () {
  if (ajax.readyState === 4 && ajax.status === 200) {
    console.log(ajax.responseText);
    ajax_map = ajax.responseText.split("\r\n");
    console.log(ajax_map);
    for (var i in ajax_map) {
      map.push(JSON.parse("[" + ajax_map[i] + "]"));
    }
  }
};
let ajax2 = new XMLHttpRequest();
ajax2.open("GET", "object.map");
ajax2.send();
ajax2.onreadystatechange = function () {
  if (ajax2.readyState === 4 && ajax2.status === 200) {
    ajax_map_ob = ajax2.responseText.split("\r\n");
    for (var i = 0; i < ajax_map_ob.length; i++) {
      map_ob.push(JSON.parse("[" + ajax_map_ob[i] + "]"));
      console.log(map_ob);
    }
  }
};
let mode = "f";
let mx = -1;
let my = -1;
let num = -1;
let n = 0;
let o = 0;
let p = 0;
let str = [[], [], ["3", "2"], ["3", "2"]];
let scene = "aa";
let key = [];
let key_co = [];
let map_scene = "both";
for (var i = 0; i < 256; i++) {
  key[i] = 0;
}
for (var i = 0; i < 10; i++) {
  key_co[i] = 0;
}
let images = [];
let ima_32_t = [];
let srcs = [
  "ima/pipo-map001.png",
  "ima/pipo-charachip021.png",
  "ima/pipo-map001_at-umi.png",
  "ima/bem/clover.jpg",
  "ima/bem/flower.jpg",
  "ima/bem/grass.jpg",
  "ima/bem/lawn.jpg",
  "ima/bem/road.jpg",
  "ima/bem/soil.jpg",
  "ima/bem/stone.jpg",
  "ima/bem/white.jpg",
  "ima/bem/water.png",
  "ima/pipo/pipo-Text_Pause001.png",
];
for (var i in srcs) {
  images[i] = new Image();
  images[i].src = srcs[i];
}
let x = 0;
let y = 0;
let k = -1;
let map_mode = "map";
function Key2(a, b, c, d) {
  if (key[a] == 1 || key[b] == 1) {
    if (key_co[c] <= 0) {
      key_co[c] = d;
      return true;
    } else {
      key_co[c]--;
      return false;
    }
  } else {
    key_co[c]--;
    return false;
  }
}
let ima_32 = [];
for (var i = 0; i < 100; i++) {
  ima_32[i] = undefined;
}
ima_32[0] = [images[11], 160, 0, 32, 32];
ima_32[1] = [images[5], 0, 0, 1257, 1256];
ima_32[2] = [images[3], 0, 0, 1140, 1140];
ima_32[3] = [images[4], 0, 0, 1536, 1536];
ima_32[4] = [images[6], 0, 0, 1170, 1170];
ima_32[5] = [images[7], 0, 0, 637, 637];
ima_32[6] = [images[8], 0, 0, 1269, 1270];
ima_32[7] = [images[9], 0, 0, 2196, 2196];
ima_32[8] = [images[0], 96, 192, 32, 32];
ima_32[9] = [images[0], 128, 192, 32, 32];
ima_32[10] = [images[0], 96, 224, 32, 32];
ima_32[11] = [images[0], 128, 224, 32, 32];
ima_32[12] = [images[0], 32, 192, 32, 32];
ima_32[13] = [images[0], 64, 192, 32, 32];
ima_32[14] = [images[0], 0, 128, 64, 64];

function draw1(a, b, d) {
  c.drawImage(ima_32[a][0], ima_32[a][1], ima_32[a][2], ima_32[a][3], ima_32[a][4], b, d, 32, 32);
}
var rpgmap = setInterval(function () {
  c.clearRect(0, 0, 5000, 5000);
  c.font = "15px Arial";
  if (scene == "aa") {
    if (mode == "f") {
      c.fillText("画像選択モード", 700, 100);
    }
    if (mode == "j") {
      c.fillText("画像変更モード", 700, 100);
    }
    c.fillText("change", 700, 300);
    c.strokeRect(695, 280, 75, 30);
    if (map_mode == "map") {
      c.fillText("マップ", 700, 400);
    }
    if (map_mode == "object") {
      c.fillText("オブジェクト", 700, 400);
    }
    c.fillText(num, 700, 130);
    if (num >= 0) {
      draw1(num, 700, 150);
    }
    c.fillText(d + e * 20, d * 40 + 50, 500 + e * 60);
    if (my < 0 || mx < 0) {
    } else {
      if (map_mode == "map") {
        if (map[my] == undefined) {
          map[my] = [];
        }
        map[my][mx] = num;
      } else {
        if (map_ob[my] == undefined) {
          map_ob[my] = [];
        }
        map_ob[my][mx] = num;
      }
    }
    if (Key2(67, 16, 4, 30)) {
      if (mode == "f") {
        mode = "j";
      } else {
        mode = "f";
      }
    }
    if (Key2(73, 38, 3, 20)) {
      y--;
    }
    if (Key2(74, 37, 3, 20)) {
      x--;
    }
    if (Key2(75, 40, 3, 20)) {
      y++;
    }
    if (Key2(76, 39, 3, 20)) {
      x++;
    }
    if (Key2(13, 32, 4, 8)) {
      s.innerHTML = ima_32_t.join("<br>") + "<br>" + "<br>" + map_ob.join("<br>") + "<br>" + "<br>" + map.join("<br>");
    }
    for (var e = 0; e <= 4; e++) {
      for (var d = 0; d <= 19; d++) {
        c.fillText(d + e * 20, d * 40 + 50, 500 + e * 60);
        if (ima_32[d + e * 20] != undefined) {
          draw1(d + e * 20, d * 40 + 50, 510 + e * 60);
        }
      }
    }
    for (var a = y; a <= y + 14; a++) {
      for (var b = x; b <= x + 20; b++) {
        if (map[a] == undefined) {
          if (map[a + 1] != undefined) {
            map[a] = [-1];
          }
        } else {
          if (a < 0 || b < 0 || a >= map.length || b >= map[a].length) {
          } else {
            if (map[a][b] == undefined) {
              if (map[a][b + 1] != undefined) {
                map[a][b] = -1;
              }
            } else {
              if (map[a][b] != -1) {
                if (map_scene == "map" || map_scene == "both") {
                  draw1(map[a][b], 32 * (b - x) - 16, 32 * (a - y));
                }
              }
            }
          }
        }
        if (map_ob[a] == undefined) {
          if (map_ob[a + 1] != undefined) {
            map_ob[a] = [-1];
          }
        } else {
          if (a < 0 || b < 0 || a >= map_ob.length || b >= map_ob[a].length) {
          } else {
            if (map_ob[a][b] == undefined) {
              if (map_ob[a][b + 1] != undefined) {
                map_ob[a][b] = -1;
              }
            } else {
              if (map_ob[a][b] != -1) {
                if (map_scene == "object" || map_scene == "both") {
                  draw1(map_ob[a][b], 32 * (b - x) - 16, 32 * (a - y));
                }
              }
            }
          }
        }
      }
    }
  }
  if (scene == "bb") {
    for (var h = 0; h <= 3; h++) {
      for (var i = 0; i <= 4; i++) {
        if (h * 5 + i < images.length) {
          c.drawImage(images[h * 5 + i], 0, 0, 200, 200, i * 200, h * 200, 200, 200);
        }
      }
    }
    if (Key2(66, 226, 4, 8)) {
      scene = "aa";
    }
  }
  if (scene == "cc") {
    c.fillText("Max   x " + images[l].naturalWidth + " y " + images[l].naturalHeight, 0, 30);
    for (m = 0; m < 10; m++) {
      c.fillText(m, 200 + m * 30, 30);
      c.fillText(m * 32, 200 + m * 30, 50);
    }
    c.fillText("click   x " + n + " y " + o, 550, 30);
    c.fillText("32で割ると...   x " + Math.floor(n / 32) + " y " + Math.floor(o / 32), 550, 50);
    c.fillText(Math.floor(n / 32) * 32 + "  " + Math.floor(o / 32) * 32 + "  32  32", 550, 80);
    c.drawImage(images[l], 0, 0, images[l].naturalWidth, images[l].naturalHeight, 0, 100, images[l].naturalWidth, images[l].naturalHeight);
    if (Key2(74, 37, 0, 20)) {
      p--;
      if (p == -1) {
        p = 3;
      }
    }
    if (Key2(76, 39, 0, 20)) {
      p++;
      if (p == 4) {
        p = 0;
      }
    }
    if (Key2(48, 96, 2, 80)) {
      str[p].push("0");
    }
    if (Key2(49, 97, 2, 80)) {
      str[p].push("1");
    }
    if (Key2(50, 98, 2, 80)) {
      str[p].push("2");
    }
    if (Key2(51, 99, 2, 80)) {
      str[p].push("3");
    }
    if (Key2(52, 100, 2, 80)) {
      str[p].push("4");
    }
    if (Key2(53, 101, 2, 80)) {
      str[p].push("5");
    }
    if (Key2(54, 102, 2, 80)) {
      str[p].push("6");
    }
    if (Key2(55, 103, 2, 80)) {
      str[p].push("7");
    }
    if (Key2(56, 104, 2, 80)) {
      str[p].push("8");
    }
    if (Key2(57, 105, 2, 80)) {
      str[p].push("9");
    }
    if (Key2(8, 189, 3, 8)) {
      str[p].pop();
    }
    c.fillText(str[0].join(""), 810, 50);
    c.fillText(str[1].join(""), 910, 50);
    c.fillText(str[2].join(""), 1010, 50);
    c.fillText(str[3].join(""), 1110, 50);
    c.strokeRect(800 + p * 100, 30, 80, 30);
    c.fillText("Max", 750, 50);
    c.strokeRect(745, 30, 40, 30);
    c.fillText("指定", 750, 85);
    c.strokeRect(745, 65, 40, 30);
    if (Key2(13, 32, 4, 30)) {
      ima_32[k] = [images[l], Number(str[0].join("")), Number(str[1].join("")), Number(str[2].join("")), Number(str[3].join(""))];
      scene = "aa";
      ima_32_t.push(
        "ima_32[" + k + "] = [images[" + l + "]," + Number(str[0].join("")) + "," + Number(str[1].join("")) + "," + Number(str[2].join("")) + "," + Number(str[3].join("")) + "]"
      );
      str = [[], [], ["3", "2"], ["3", "2"]];
    }
    if (Key2(66, 226, 4, 8)) {
      scene = "bb";
    }
  }
  window.onkeydown = function (e) {
    key[e.keyCode] = 1;
  };
  window.onkeyup = function (e) {
    key[e.keyCode] = 0;
  };
  mx = -1;
  my = -1;
}, 1000 / 30);
document.body.addEventListener("click", function (e) {
  var rect = e.target.getBoundingClientRect();
  mouse_x = e.clientX - Math.floor(rect.left);
  mouse_y = e.clientY - Math.floor(rect.top);
  if (scene == "aa") {
    if (mouse_x >= 695 && mouse_x <= 770 && mouse_y >= 280 && mouse_y <= 310) {
      if (map_mode == "map") {
        map_mode = "object";
      } else {
        map_mode = "map";
      }
    }
    if (mouse_x >= 0 && mouse_x <= 656 && mouse_y >= 0 && mouse_y <= 480) {
      mx = Math.floor((mouse_x + 16) / 32) + x;
      my = Math.floor(mouse_y / 32) + y;
    }
    if (mouse_x >= 50 && mouse_x <= 850 && mouse_y >= 500 && mouse_y <= 810) {
      if (mode == "f") {
        g = Math.floor((mouse_x - 50) / 40) + Math.floor((mouse_y - 500) / 60) * 20;
        if (ima_32[g] != undefined) {
          num = g;
        } else {
          num = -1;
        }
      }
      if (mode == "j") {
        k = Math.floor((mouse_x - 50) / 40) + Math.floor((mouse_y - 500) / 60) * 20;
        scene = "bb";
      }
    }
  } else if (scene == "bb") {
    if (mouse_x >= 0 && mouse_x <= 1000 && mouse_y >= 0) {
      l = Math.floor(mouse_x / 200) + Math.floor(mouse_y / 200) * 5;
      if (l < images.length) {
        scene = "cc";
      }
    }
  } else if (scene == "cc") {
    if (mouse_x >= 0 && mouse_y >= 100) {
      n = mouse_x;
      o = mouse_y - 100;
    }
    if (mouse_x >= 745 && mouse_x <= 785 && mouse_y >= 30 && mouse_y <= 60) {
      str = [["0"], ["0"], String(images[l].naturalWidth).split(""), String(images[l].naturalHeight).split("")];
    }
    if (mouse_x >= 745 && mouse_x <= 785 && mouse_y >= 65 && mouse_y <= 95) {
      str = [String(Math.floor(n / 32) * 32).split(""), String(Math.floor(o / 32) * 32).split(""), ["3", "2"], ["3", "2"]];
    }
  }
});
