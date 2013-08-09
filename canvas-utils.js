function circle (ctx, x, y, r, stroke) {
    ctx.beginPath();
	ctx.arc(x, y, r, 0, Math.PI*2, true);
	ctx.closePath();
	if (stroke)
		ctx.stroke();
	else
		ctx.fill();
}
function rect (ctx, x, y, w, h) {
	ctx.beginPath();
	ctx.rect(x, y, w, h);
	ctx.closePath();
	ctx.fill();
}
function lineTo(ctx, x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2);
	ctx.closePath();
	ctx.stroke();
}
function text(ctx, txt, x, y, fontsize) {
	var fsize = fontsize || 12;
	//ctx.fillStyle = "#ffffff";
	ctx.font = "normal " + fsize + "px arial";
	ctx.lineStyle = "#cccccc";
	ctx.lineWidth = 1;
	ctx.fillText(txt, x, y);
	//ctx.strokeText(txt, x, y);
	//console.log('wrote', txt);
}
function text2(ctx, txt, x, y, fontsize) { return text(ctx, txt, x, y, fontsize); }
function getWidth(ctx) {
	return ctx.canvas.width;
}
function getHeight(ctx) {
	return ctx.canvas.height;
}
function pizzaTimer (ctx, cx, cy, r, startPercent, endPercent, lnWidth, gradShift, color) {
  lnWidth = lnWidth || 5;
  gradShift = gradShift || 0;
  color = color || "#f52";
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.arc(cx, cy, r, Math.PI*2 * ((startPercent-gradShift)/100), Math.PI*2 * ((100-endPercent-gradShift)/100), true);
  ctx.lineWidth = lnWidth;

  var tmpShadowBlur = ctx.shadowBlur;
  var tmpShadowColor = ctx.shadowColor;

  ctx.shadowBlur = 20;
  ctx.shadowColor = color;
  ctx.stroke();

  ctx.shadowBlur = tmpShadowBlur;
  ctx.shadowColor = tmpShadowColor;
};