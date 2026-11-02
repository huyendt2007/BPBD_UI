/* Swimlane renderer - So do luong nghiep vu BTNN.
 * Input: window.SPECS = [{ id, title, lanes:[{name, cols}], rows, colW, rowH, nodes:[...], edges:[...] }]
 * node: { id, lane, col, row, type: step|decision|start|end|offpage|note, num, text, status, hl }
 * edge: { from, to, label, dashed, fs (from side: L|R|T|B), ts (to side) }
 * Output: window.RESULTS = [{ id, w, h, svg, warnings:[] }]
 * Layout: explicit grid; connectors routed orthogonally by A* on a 10px lattice, avoiding boxes.
 */
(function () {
  'use strict';
  var G = 10, TITLE_H = 40, HEAD_H = 40, PAD = 10;
  var FONT = 'Arial, Helvetica, sans-serif';
  var C = { line: '#2f6fb0', border: '#333333', hl: '#c9f1f5', off: '#ede7f6', offB: '#5e35b1', pillF: '#fff3c4', pillB: '#c99a06', pillT: '#6b4e00', lbl: '#1f4e79', head: '#f3f6fa', note: '#fafafa' };
  var ctx = document.createElement('canvas').getContext('2d');
  function tw(t, size, bold) { ctx.font = (bold ? 'bold ' : '') + size + 'px ' + FONT; return ctx.measureText(t).width; }
  function wrap(t, maxW, size, bold) {
    var out = [];
    String(t).split('\n').forEach(function (para) {
      var words = para.split(/\s+/).filter(Boolean), line = '';
      var ws2 = [];
      words.forEach(function (w) {
        // tách từ quá dài theo ký tự
        while (tw(w, size, bold) > maxW && w.length > 1) {
          var k = w.length - 1; while (k > 1 && tw(w.slice(0, k), size, bold) > maxW) k--;
          ws2.push(w.slice(0, k)); w = w.slice(k);
        }
        ws2.push(w);
      });
      ws2.forEach(function (w) {
        var tryL = line ? line + ' ' + w : w;
        if (tw(tryL, size, bold) <= maxW || !line) line = tryL; else { out.push(line); line = w; }
      });
      if (line) out.push(line);
    });
    return out.length ? out : [''];
  }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  function render(spec) {
    var warn = [];
    var colW = spec.colW || 240, rowH = spec.rowH || 120;
    var lanes = spec.lanes, laneX = [], x = PAD;
    lanes.forEach(function (l) { laneX.push(x); x += (l.cols || 1) * colW; });
    var W = x + PAD;
    var top = PAD + TITLE_H + HEAD_H;
    // bỏ hàng trống: đánh lại chỉ số hàng theo các hàng có node
    var used = []; spec.nodes.forEach(function (n) { if (used.indexOf(n.row) < 0) used.push(n.row); });
    used.sort(function (a, b) { return a - b; });
    spec.nodes.forEach(function (n) { n.row = used.indexOf(n.row); });
    var rows = used.length;
    var H = top + rows * rowH + PAD;
    var nodes = {};
    // ---- node geometry
    spec.nodes.forEach(function (n) {
      if (lanes[n.lane] === undefined) warn.push('Node ' + n.id + ': lane không tồn tại');
      var cx = laneX[n.lane] + ((n.col || 0) + 0.5) * colW, cy = top + (n.row + 0.5) * rowH;
      n.cx = cx; n.cy = cy;
      var label = (n.num !== undefined && n.num !== null ? n.num + '. ' : '') + (n.text || '');
      if (n.type === 'decision') {
        n.w = n.w || 140; n.lines = wrap(label, n.w * 0.58, 11.5); n.fs = 11.5;
        if (n.lines.length > 2) { n.w = 196; n.lines = wrap(label, n.w * 0.5, 11.5); }
        n.h = Math.max(70, n.lines.length * 14 + (n.lines.length > 2 ? 52 : 34));
      } else if (n.type === 'start' || n.type === 'end') {
        n.w = n.h = 56; n.lines = wrap(label, 48, 11.5); n.fs = 11.5;
      } else {
        n.w = n.w || Math.min(160, colW - 60); n.fs = 12.5;
        n.lines = wrap(label, n.w - 16, n.fs, false);
        n.pill = n.status ? wrap(n.status, n.w - 26, 11) : null;
        n.h = n.lines.length * 15.5 + 16 + (n.pill ? n.pill.length * 13 + 10 : 0);
        n.h = Math.max(n.h, 46);
        if (n.type === 'offpage') n.w = n.w; // same width, tag drawn inside
      }
      // snap half-sizes so that box edges sit between lattice points
      n.x0 = cx - n.w / 2; n.x1 = cx + n.w / 2; n.y0 = cy - n.h / 2; n.y1 = cy + n.h / 2;
      if (n.h > rowH - 24) warn.push('Node ' + n.id + ' cao hơn hàng (' + Math.round(n.h) + 'px)');
      nodes[n.id] = n;
    });
    // overlap check between boxes
    var arr = spec.nodes;
    for (var i = 0; i < arr.length; i++) for (var j = i + 1; j < arr.length; j++) {
      var a = arr[i], b = arr[j];
      if (a.x0 < b.x1 + 8 && b.x0 < a.x1 + 8 && a.y0 < b.y1 + 8 && b.y0 < a.y1 + 8) warn.push('Chồng hộp: ' + a.id + ' / ' + b.id);
    }
    // ---- lattice
    var NX = Math.floor(W / G) + 1, NY = Math.floor(H / G) + 1;
    var blocked = new Uint8Array(NX * NY);
    function idx(ix, iy) { return iy * NX + ix; }
    function inflate(n, m) { return { x0: n.x0 - m, x1: n.x1 + m, y0: n.y0 - m, y1: n.y1 + m }; }
    for (var iy = 0; iy < NY; iy++) for (var ix = 0; ix < NX; ix++) {
      var px = ix * G, py = iy * G;
      if (py < top + 4 || py > H - PAD || px < PAD + 4 || px > W - PAD - 4) { blocked[idx(ix, iy)] = 1; continue; }
      for (var k = 0; k < arr.length; k++) {
        var r = inflate(arr[k], 7);
        if (px > r.x0 && px < r.x1 && py > r.y0 && py < r.y1) { blocked[idx(ix, iy)] = 1; break; }
      }
    }
    var occH = new Uint8Array(NX * NY), occV = new Uint8Array(NX * NY), portUse = {};
    // không chạy dọc theo đường phân cách lane
    var laneLine = new Uint8Array(NX);
    laneX.forEach(function (lx, i) { if (i > 0) { var c0 = Math.round(lx / G); laneLine[c0] = 1; } });
    // ports: list of {side, bx, by (point on shape), ix, iy (lattice point outside)}
    function ports(n, forceSide) {
      var list = [];
      function add(side, bx, by) {
        var ix, iy;
        if (side === 'L') { ix = Math.floor((n.x0 - 8) / G); iy = Math.round(by / G); }
        if (side === 'R') { ix = Math.ceil((n.x1 + 8) / G); iy = Math.round(by / G); }
        if (side === 'T') { iy = Math.floor((n.y0 - 8) / G); ix = Math.round(bx / G); }
        if (side === 'B') { iy = Math.ceil((n.y1 + 8) / G); ix = Math.round(bx / G); }
        // shape point aligned with lattice coordinate
        if (side === 'L' || side === 'R') by = iy * G; else bx = ix * G;
        if (ix < 0 || iy < 0 || ix >= NX || iy >= NY || blocked[idx(ix, iy)]) return;
        list.push({ side: side, bx: bx, by: by, ix: ix, iy: iy });
      }
      var sides = forceSide ? [forceSide] : ['L', 'R', 'T', 'B'];
      sides.forEach(function (s) {
        var offs = [0];
        if (n.type === 'step' || n.type === 'offpage' || n.type === 'note') offs = (s === 'T' || s === 'B') ? [0, -30, 30] : [0, -10, 10];
        offs.forEach(function (o) {
          if (s === 'L') add('L', n.x0, n.cy + o);
          if (s === 'R') add('R', n.x1, n.cy + o);
          if (s === 'T') add('T', n.cx + o, n.y0);
          if (s === 'B') add('B', n.cx + o, n.y1);
        });
      });
      return list;
    }
    var DX = { L: -1, R: 1, T: 0, B: 0 }, DY = { L: 0, R: 0, T: -1, B: 1 };
    var DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
    function heapPush(h, it) { h.push(it); var i = h.length - 1; while (i > 0) { var p = (i - 1) >> 1; if (h[p][0] <= h[i][0]) break; var t = h[p]; h[p] = h[i]; h[i] = t; i = p; } }
    function heapPop(h) { var top = h[0], last = h.pop(); if (h.length) { h[0] = last; var i = 0; for (;;) { var l = 2 * i + 1, r = l + 1, m = i; if (l < h.length && h[l][0] < h[m][0]) m = l; if (r < h.length && h[r][0] < h[m][0]) m = r; if (m === i) break; var t = h[m]; h[m] = h[i]; h[i] = t; i = m; } } return top; }

    function route(e) {
      var a = nodes[e.from], b = nodes[e.to];
      if (!a || !b) { warn.push('Edge thiếu node: ' + e.from + ' -> ' + e.to); return null; }
      var sp = ports(a, e.fs), tp = ports(b, e.ts);
      if (!sp.length || !tp.length) { warn.push('Không có cổng: ' + e.from + ' -> ' + e.to); return null; }
      var goal = {};
      tp.forEach(function (p) { goal[idx(p.ix, p.iy)] = p; });
      var N = NX * NY * 4, dist = new Float64Array(N).fill(Infinity), prev = new Int32Array(N).fill(-1), startPort = {};
      var h = [];
      function hcost(ix, iy) { var m = Infinity; tp.forEach(function (p) { var d = Math.abs(p.ix - ix) + Math.abs(p.iy - iy); if (d < m) m = d; }); return m; }
      function dirIndex(dx, dy) { return dx === 1 ? 0 : dx === -1 ? 1 : dy === 1 ? 2 : 3; }
      sp.forEach(function (p) {
        var d = dirIndex(DX[p.side], DY[p.side]), s = idx(p.ix, p.iy) * 4 + d;
        var c = (portUse[e.from + p.side + p.ix + '_' + p.iy] ? 40 : 0) + (p.bx !== a.cx && p.by !== a.cy ? 3 : 0);
        if (c < dist[s]) { dist[s] = c; startPort[s] = p; heapPush(h, [c + hcost(p.ix, p.iy), s]); }
      });
      var found = -1, endPort = null;
      while (h.length) {
        var it = heapPop(h), s = it[1], cell = (s / 4) | 0, d = s % 4;
        if (it[2]) { found = s; endPort = goal[cell]; break; }
        var cst = dist[s];
        if (it[0] - hcost(cell % NX, (cell / NX) | 0) > cst + 1e-9) continue;
        var gp = goal[cell];
        if (gp) {
          // must arrive moving into the box; reused target port costs more
          var need = dirIndex(-DX[gp.side], -DY[gp.side]);
          if (d === need) {
            var pen = portUse[e.to + gp.side + gp.ix + '_' + gp.iy] ? 45 : 0;
            pen += (gp.bx !== b.cx && gp.by !== b.cy) ? 3 : 0;
            heapPush(h, [cst + pen, s, 1]);
          }
        }
        var cx = cell % NX, cy = (cell / NX) | 0;
        for (var k = 0; k < 4; k++) {
          var nx = cx + DIRS[k][0], ny = cy + DIRS[k][1];
          if (nx < 0 || ny < 0 || nx >= NX || ny >= NY) continue;
          var ni = idx(nx, ny);
          if (blocked[ni] && !goal[ni]) continue;
          if ((d === 0 && k === 1) || (d === 1 && k === 0) || (d === 2 && k === 3) || (d === 3 && k === 2)) continue;
          var c = 1 + (k !== d ? 6 : 0);
          var horiz = k < 2;
          if (!horiz && laneLine[nx]) c += 40;
          if (horiz ? occH[ni] : occV[ni]) c += 60;
          else if (horiz ? occV[ni] : occH[ni]) c += 10;
          var ns = ni * 4 + k, nd = cst + c;
          if (nd < dist[ns]) { dist[ns] = nd; prev[ns] = s; heapPush(h, [nd + hcost(nx, ny), ns]); }
        }
      }
      if (found < 0) { warn.push('Không định tuyến được: ' + e.from + ' -> ' + e.to); return null; }
      var pts = [], s2 = found, first = found;
      while (s2 >= 0) { var cl = (s2 / 4) | 0; pts.push([(cl % NX) * G, ((cl / NX) | 0) * G]); first = s2; s2 = prev[s2]; }
      pts.reverse();
      var stp = startPort[first];
      // mark occupancy
      for (var q = 0; q < pts.length - 1; q++) {
        var p0 = pts[q], p1 = pts[q + 1], hz = p0[1] === p1[1];
        [p0, p1].forEach(function (p) { var ii = idx(p[0] / G, p[1] / G); if (hz) occH[ii] = 1; else occV[ii] = 1; });
      }
      portUse[e.from + stp.side + stp.ix + '_' + stp.iy] = 1;
      portUse[e.to + endPort.side + endPort.ix + '_' + endPort.iy] = 1;
      var full = [[stp.bx, stp.by]].concat(pts).concat([[endPort.bx, endPort.by]]);
      // simplify collinear points
      var simp = [full[0]];
      for (var z = 1; z < full.length - 1; z++) {
        var A = simp[simp.length - 1], B = full[z], Cc = full[z + 1];
        if ((A[0] === B[0] && B[0] === Cc[0]) || (A[1] === B[1] && B[1] === Cc[1])) continue;
        simp.push(B);
      }
      simp.push(full[full.length - 1]);
      return simp;
    }
    var routes = [];
    spec.edges.forEach(function (e) { routes.push({ e: e, pts: route(e) }); });
    // verify no segment crosses a box interior (other than own endpoints' boxes at the ends)
    routes.forEach(function (r) {
      if (!r.pts) return;
      for (var q = 0; q < r.pts.length - 1; q++) {
        var p0 = r.pts[q], p1 = r.pts[q + 1];
        arr.forEach(function (n) {
          var ins = function (px, py) { return px > n.x0 + 1 && px < n.x1 - 1 && py > n.y0 + 1 && py < n.y1 - 1; };
          var steps = 20;
          for (var t = 1; t < steps; t++) { var px = p0[0] + (p1[0] - p0[0]) * t / steps, py = p0[1] + (p1[1] - p0[1]) * t / steps; if (ins(px, py)) { warn.push('Mũi tên cắt hộp ' + n.id + ': ' + r.e.from + '->' + r.e.to); return; } }
        });
      }
    });
    // ---- labels
    var placed = arr.map(function (n) { return { x0: n.x0 - 2, x1: n.x1 + 2, y0: n.y0 - 2, y1: n.y1 + 2 }; });
    var segs = [];
    routes.forEach(function (r) {
      if (!r.pts) return;
      for (var q = 0; q < r.pts.length - 1; q++) {
        var p0 = r.pts[q], p1 = r.pts[q + 1];
        segs.push({ x0: Math.min(p0[0], p1[0]) - 1, x1: Math.max(p0[0], p1[0]) + 1, y0: Math.min(p0[1], p1[1]) - 1, y1: Math.max(p0[1], p1[1]) + 1 });
      }
    });
    var laneRects = laneX.map(function (lx, i) { return i > 0 ? { x0: lx - 1, x1: lx + 1, y0: top, y1: H } : null; }).filter(Boolean);
    var relaxLane = false;
    function hit(rc) {
      if (rc.x0 < PAD + 3 || rc.x1 > W - PAD - 3) return true;
      var all = relaxLane ? placed.concat(segs) : placed.concat(segs, laneRects);
      return all.some(function (o) { return rc.x0 < o.x1 && o.x0 < rc.x1 && rc.y0 < o.y1 && o.y0 < rc.y1; });
    }
    var labels = [];
    routes.forEach(function (r) {
      if (!r.pts || !r.e.label) return;
      var ok = null, lines, cands;
      [[0,120],[0,70],[0,46],[1,120],[1,70],[1,46]].some(function (pm) { var maxw = pm[1]; relaxLane = !!pm[0];
      lines = wrap(r.e.label, maxw, 11);
      var lw = Math.max.apply(null, lines.map(function (l) { return tw(l, 11); })) + 6, lh = lines.length * 13 + 3;
      cands = [];
      for (var q = 0; q < r.pts.length - 1; q++) {
        var p0 = r.pts[q], p1 = r.pts[q + 1], len = Math.abs(p1[0] - p0[0]) + Math.abs(p1[1] - p0[1]);
        if (len < 24) continue;
        var hz = p0[1] === p1[1];
        [0.5, 0.3, 0.7, 0.18, 0.82].forEach(function (f) {
          var mx = p0[0] + (p1[0] - p0[0]) * f, my = p0[1] + (p1[1] - p0[1]) * f;
          if (hz) { cands.push({ x: mx - lw / 2, y: my - lh - 2 }); cands.push({ x: mx - lw / 2, y: my + 2 }); }
          else { cands.push({ x: mx + 3, y: my - lh / 2 }); cands.push({ x: mx - lw - 3, y: my - lh / 2 }); }
        });
      }
      for (var c = 0; c < cands.length; c++) { var rc = { x0: cands[c].x, x1: cands[c].x + lw, y0: cands[c].y, y1: cands[c].y + lh }; if (rc.y0 > top && rc.y1 < H - 2 && !hit(rc)) { ok = rc; break; } }
      if (!ok && maxw === 46 && relaxLane) { warn.push('Nhãn chồng: ' + r.e.label); lines = wrap(r.e.label, 120, 11); lw = Math.max.apply(null, lines.map(function (l) { return tw(l, 11); })) + 6; lh = lines.length * 13 + 3; if (cands.length) ok = { x0: cands[0].x, x1: cands[0].x + lw, y0: cands[0].y, y1: cands[0].y + lh }; }
      return !!ok;
      });
      if (!ok) return;
      placed.push(ok); labels.push({ rc: ok, lines: lines });
    });
    // ---- SVG
    var o = [];
    o.push('<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" font-family="' + FONT + '">');
    o.push('<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="' + C.line + '"/></marker></defs>');
    o.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>');
    o.push('<rect x="' + PAD + '" y="' + PAD + '" width="' + (W - 2 * PAD) + '" height="' + (H - 2 * PAD) + '" fill="#fff" stroke="' + C.border + '" stroke-width="1.2"/>');
    o.push('<line x1="' + PAD + '" y1="' + (PAD + TITLE_H) + '" x2="' + (W - PAD) + '" y2="' + (PAD + TITLE_H) + '" stroke="' + C.border + '"/>');
    o.push('<text x="' + (PAD + 10) + '" y="' + (PAD + 26) + '" font-size="15" font-weight="bold" fill="#111">' + esc(spec.title) + '</text>');
    lanes.forEach(function (l, i) {
      var lx = laneX[i], lw = (l.cols || 1) * colW;
      o.push('<rect x="' + lx + '" y="' + (PAD + TITLE_H) + '" width="' + lw + '" height="' + HEAD_H + '" fill="' + C.head + '" stroke="' + C.border + '" stroke-width="0.8"/>');
      var hl = wrap(l.name, lw - 16, 12.5, true);
      hl.forEach(function (t, k) { o.push('<text x="' + (lx + lw / 2) + '" y="' + (PAD + TITLE_H + HEAD_H / 2 + 4 + (k - (hl.length - 1) / 2) * 14) + '" font-size="12.5" font-weight="bold" text-anchor="middle" fill="#111">' + esc(t) + '</text>'); });
      if (i > 0) o.push('<line x1="' + lx + '" y1="' + (PAD + TITLE_H) + '" x2="' + lx + '" y2="' + (H - PAD) + '" stroke="' + C.border + '" stroke-width="0.8"/>');
    });
    routes.forEach(function (r) {
      if (!r.pts) return;
      o.push('<polyline points="' + r.pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' ') + '" fill="none" stroke="' + C.line + '" stroke-width="1.4"' + (r.e.dashed ? ' stroke-dasharray="5,4"' : '') + ' marker-end="url(#ah)"/>');
    });
    arr.forEach(function (n) {
      var fill = n.hl ? C.hl : (n.type === 'note' ? C.note : '#ffffff');
      if (n.type === 'decision') {
        o.push('<polygon points="' + n.cx + ',' + n.y0 + ' ' + n.x1 + ',' + n.cy + ' ' + n.cx + ',' + n.y1 + ' ' + n.x0 + ',' + n.cy + '" fill="' + fill + '" stroke="' + C.border + '" stroke-width="1"/>');
      } else if (n.type === 'start' || n.type === 'end') {
        o.push('<circle cx="' + n.cx + '" cy="' + n.cy + '" r="' + (n.w / 2) + '" fill="#fff" stroke="' + C.border + '" stroke-width="' + (n.type === 'end' ? 2.2 : 1) + '"/>');
      } else if (n.type === 'offpage') {
        var t = 14;
        o.push('<polygon points="' + n.x0 + ',' + n.y0 + ' ' + (n.x1 - t) + ',' + n.y0 + ' ' + n.x1 + ',' + n.cy + ' ' + (n.x1 - t) + ',' + n.y1 + ' ' + n.x0 + ',' + n.y1 + '" fill="' + C.off + '" stroke="' + C.offB + '" stroke-width="1.2"/>');
      } else {
        o.push('<rect x="' + n.x0 + '" y="' + n.y0 + '" width="' + n.w + '" height="' + n.h + '" rx="' + (n.type === 'note' ? 8 : 1) + '" fill="' + fill + '" stroke="' + C.border + '" stroke-width="1"' + (n.type === 'note' ? ' stroke-dasharray="4,3"' : '') + '/>');
      }
      var lh = n.type === 'decision' || n.type === 'start' || n.type === 'end' ? 14 : 15.5;
      var pillH = n.pill ? n.pill.length * 13 + 6 : 0;
      var textH = n.lines.length * lh;
      var y0 = n.cy - (textH + (n.pill ? pillH + 4 : 0)) / 2 + lh - 4;
      var xOff = n.type === 'offpage' ? -6 : 0;
      n.lines.forEach(function (t, k) { o.push('<text x="' + (n.cx + xOff) + '" y="' + (y0 + k * lh) + '" font-size="' + n.fs + '" text-anchor="middle" fill="#111">' + esc(t) + '</text>'); });
      if (n.pill) {
        var pw = Math.max.apply(null, n.pill.map(function (t) { return tw(t, 11); })) + 12, py = y0 + textH - lh + 8;
        o.push('<rect x="' + (n.cx + xOff - pw / 2) + '" y="' + py + '" width="' + pw + '" height="' + pillH + '" rx="' + Math.min(9, pillH / 2) + '" fill="' + C.pillF + '" stroke="' + C.pillB + '" stroke-width="0.8"/>');
        n.pill.forEach(function (t, k) { o.push('<text x="' + (n.cx + xOff) + '" y="' + (py + 12 + k * 13) + '" font-size="11" text-anchor="middle" fill="' + C.pillT + '">' + esc(t) + '</text>'); });
      }
    });
    labels.forEach(function (L) {
      o.push('<rect x="' + L.rc.x0 + '" y="' + L.rc.y0 + '" width="' + (L.rc.x1 - L.rc.x0) + '" height="' + (L.rc.y1 - L.rc.y0) + '" fill="#ffffff" opacity="0.92"/>');
      L.lines.forEach(function (t, k) { o.push('<text x="' + ((L.rc.x0 + L.rc.x1) / 2) + '" y="' + (L.rc.y0 + 12 + k * 13) + '" font-size="11" text-anchor="middle" fill="' + C.lbl + '">' + esc(t) + '</text>'); });
    });
    o.push('</svg>');
    return { id: spec.id, w: W, h: H, svg: o.join('\n'), warnings: warn };
  }
  window.SWIM = { render: render };
})();
