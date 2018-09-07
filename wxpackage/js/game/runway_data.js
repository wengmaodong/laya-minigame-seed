
let startX = 124;
let startY = 324;
let topLen = 280;
let botLen = 140;
let leftLen = 685;
let skewLen = 265;
let rightLen = 480;
let runwarWidth = 78;
let finalHeight = 70;

let r = 110;
let r2 = 80;
let circleDeg = 33;      // 右下大角角度
let skewLineDeg = 57;
let sinSkewDeg = Math.sin(2 * Math.PI * skewLineDeg / 360);
let cosSkewDeg = Math.cos(2 * Math.PI * skewLineDeg / 360);

// 生成跑道数据
function createPosArr() {
  let posArr = [];

  // 绘制左跑道
  posArr = posArr.concat(createYLine(startX, startY, startY + leftLen));

  // 左下拐弯
  posArr = posArr.concat(createCircleLine(startX + r, startY + leftLen, r, 2, 3));

  // 绘制下跑道
  posArr = posArr.concat(createXLine(startX + r, startY + leftLen + r, startX + r + botLen));

  // 右下拐弯
  posArr = posArr.concat(createCircleLine(startX + r + botLen, startY + leftLen, r, 3, (360 - 90 + skewLineDeg) * 4 / 360));

  // 右下斜线
  posArr = posArr.concat(createSkewLine(startX + r + botLen + sinSkewDeg * r, startY + leftLen + cosSkewDeg * r, skewLen, skewLineDeg));

  // 右下靠右拐弯
  posArr = posArr.concat(createCircleLine(startX + r + topLen + r - r2, startY + rightLen, r2, (360 - circleDeg) * 4 / 360, 4));

  // 绘制右跑道
  posArr = posArr.concat(createYLine(startX + r + topLen + r, startY + rightLen, startY));

  // 右上拐弯
  posArr = posArr.concat(createCircleLine(startX + r + topLen, startY, r, 0, 1));

  // 绘制上跑道
  posArr = posArr.concat(createXLine(startX + r + topLen, startY - r, startX + r));

  // 左上拐弯
  posArr = posArr.concat(createCircleLine(startX + r, startY, r, 1, 2));
  return posArr;
}

// 绘制竖直线
function createYLine(startX, startY, stopY) {
  let lineArr = [];
  let isDown = stopY - startY > 0;
  let _startY = isDown ? startY : stopY;
  let _stopY = isDown ? stopY : startY;

  for (; _startY < _stopY; _startY++) {
    lineArr.push({
      x: startX,
      y: _startY,
      deg: isDown ? 180 : 0,
    });
  }
  return isDown ? lineArr : lineArr.reverse();
}

// 绘制水平线
function createXLine(startX, startY, stopX) {
  let lineArr = [];
  let isDown = stopX - startX > 0;
  let _startX = isDown ? startX : stopX;
  let _stopX = isDown ? stopX : startX;

  for (; _startX < _stopX; _startX++) {
    lineArr.push({
      x: _startX,
      y: startY,
      deg: isDown ? 90 : 270,
    });
  }
  return isDown ? lineArr : lineArr.reverse();
}

// 绘制斜线
function createSkewLine(startX, startY, length, deg) {
  let result = [];
  deg = Number(deg);
  for (let i = 0; i < length; i++) {
    let pos = {};
    let dag = deg * 2 * Math.PI / 360;
    pos['x'] = startX + Math.cos(dag) * i;
    pos['y'] = startY - Math.sin(dag) * i;
    pos['deg'] = 90 - deg;
    result.push(pos);
  }
  // console.log(result);
  return result;
}

// 绘制圆弧数据 dir按坐标象限 1, 2, 3, 4

/**
 * 
 * @param {*} x 圆心x
 * @param {*} y 圆心x
 * @param {*} r 圆半径
 * @param {*} dir 取第几象限区域
 */
function createCircleLine(x, y, r, startDir, endDir) {
  let total = Math.PI * 2 * r;
  let i = startDir / 4 * total;
  let length = endDir / 4 * total;
  let result = [];

  for (; i < length; i++) {
    let pos = {};

    pos['x'] = x + Math.cos(i / r) * r;
    pos['y'] = y - Math.sin(i / r) * r;
    pos['deg'] = 360 - i / total * 360;

    result.push(pos);
  }
  return result;
}

/**
 * 获取起始位置
 * @param {*} x 
 * @param {*} y 
 */
function getStartPosIndex(x, y) {
  let index = -1;
  let posArr = runwayData;
  for (let i = 0; i < posArr.length; i++) {
    let cur = posArr[i];
    if (x > cur.x - 40 && x < cur.x + 40 && y > cur.y - 2 && y < cur.y + 2) {
      index = i;
      break;
    }
  }
  return index;
}

/**
 * 判断点是否处于跑道开始区域
 * @param {*} point {x, y} 
 */
function checkInStartArea(point) {
  return !!(
    point.x > startArea.left
    && point.x < startArea.right
    && point.y > startArea.top
    && point.y < startArea.bottom
  )
}

/**
 * 是否在跑道上
 * @param {*} point 
 */
function checkInRunway(point) {
  let posArr = runwayData;
  for (let i = 0; i < posArr.length; i++) {
    let cur = posArr[i];
    if (x > cur.x - 40 && x < cur + 40 && y > cur.y - 2 && y < cur.y + 2) {
      return true;
    }
  }
  return false;
}

/**
 * 是否在终点区域
 * @param {*位置} pos 
 */
function checkInFinal(pos) {
  return !!(
    pos.x > finalArea.left
    && pos.x < finalArea.right
    && pos.y > finalArea.top
    && pos.y < finalArea.bottom
  );
}

function transformSpeed(time) {
  return runwayData.length / (time * 60)
}

const runwayData = createPosArr();
const finalArea = {
  top: startY + 0.5 * leftLen - 0.5 * finalHeight,
  bottom: startY + 0.5 * leftLen + 0.5 * finalHeight,
  left: startX - 0.5 * runwarWidth,
  right: startX + 0.5 * runwarWidth
};

const startArea = {
  top: startY,
  bottom: startY + rightLen,
  left: startX + topLen + 2 * r - 0.5 * runwarWidth,
  right: startX + topLen + 2 * r + 0.5 * runwarWidth
};

const startPos = {
  x: startX + topLen + 2 * r,
  y: startY + 0.5 * leftLen
};

const carMaxRunNum = 10;

export {
  runwayData,
  getStartPosIndex,
  finalArea,
  checkInRunway,
  checkInFinal,
  checkInStartArea,
  transformSpeed,
  carMaxRunNum,
  startPos
}