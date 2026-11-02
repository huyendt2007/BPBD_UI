#!/bin/bash
# Tạo lại ảnh sơ đồ swimlane: bash src/build.sh [tiền_tố_id]
# - Đọc src/specs/*.js, render bằng src/render.js trong Edge headless, ghi images/<id>.svg và images/<id>.png (2x).
set -e
SRC="$(cd "$(dirname "$0")"; pwd)"; ROOT="$(cd "$SRC/.."; pwd)"; IMG="$ROOT/images"
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
cat "$SRC"/specs/*.js > "$SRC/_bundle.js"
SRCW="$(cd "$SRC"; pwd -W)"; IMGW="$(cd "$IMG"; pwd -W)"
UD="$TEMP/swim$RANDOM$RANDOM"
Q=""; [ -n "$1" ] && Q="?only=$1"
timeout 90 "$EDGE" --headless=new --disable-gpu --user-data-dir="$UD" --virtual-time-budget=60000 --allow-file-access-from-files --dump-dom "file:///$SRCW/build.html$Q" > "$TEMP/swim_out_$$.html" 2>/dev/null
rm -rf "$UD"
perl -MJSON::PP -e '
  local $/; open my $f, "<:raw", $ARGV[0] or die; my $t = <$f>; close $f;
  $t =~ /<pre id="OUT">([\s\S]*?)<\/pre>/ or die "NO OUT\n"; my $j = $1;
  $j =~ s/&lt;/</g; $j =~ s/&gt;/>/g; $j =~ s/&quot;/"/g; $j =~ s/&#39;/\x27/g; $j =~ s/&amp;/&/g;
  my $r = JSON::PP->new->utf8->decode($j);
  open my $l, ">:raw", $ARGV[2] or die;
  for my $d (@$r) {
    if ($d->{error}) { print "ERROR $d->{id}: $d->{error}\n"; next; }
    open my $o, ">:raw", "$ARGV[1]/$d->{id}.svg" or die; my $s = $d->{svg}; utf8::encode($s); print $o $s; close $o;
    print $l "$d->{id} $d->{w} $d->{h}\n";
    my @w = @{$d->{warnings}}; my $n = scalar @w;
    my $msg = "$d->{id} ${n} canh bao"; $msg .= ": " . join(" | ", @w) if $n; utf8::encode($msg); print "$msg\n";
  }' "$TEMP/swim_out_$$.html" "$IMG" "$SRC/_sizes.txt"
while read id w h; do
  UD="$TEMP/swim$RANDOM$RANDOM"
  timeout 60 "$EDGE" --headless=new --disable-gpu --user-data-dir="$UD" --hide-scrollbars --force-device-scale-factor=2 --window-size=$w,$h --screenshot="$IMGW/$id.png" "file:///$IMGW/$id.svg" >/dev/null 2>&1
  rm -rf "$UD"
done < "$SRC/_sizes.txt"
rm -f "$TEMP/swim_out_$$.html"
echo "Xong: $(wc -l < "$SRC/_sizes.txt") so do"
