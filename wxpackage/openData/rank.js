export default class Rank extends ui.pages.rankUI {
  constructor() {
    super();

    this.coinLevelArr = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    this.rank_friend_list.renderHandler = new Laya.Handler(this, this.friendListRender);
    // this.getFriendRank();

  }

  getFriendRank() {
    // 获取好友排行榜信息
    wx.getFriendCloudStorage({
      keyList: ['score'],
      success: (res) => {
        let friendRankData = [];
        friendRankData = res.data;
        // console.log('friendRankData', friendRankData);
        friendRankData = this.formatRankData(friendRankData);

        // sharectx.clearRect(0, 0, 1000, 1000)

        this.rank_friend_list.array = friendRankData;
        this.rank_friend_list.repeatY = friendRankData.length;

        this.getMyPos(friendRankData);
      }
    });
  }

  // 排序及格式化数据
  formatRankData(data) {
    let unit = '';
    let index = 0;
    let coinLevelArr = this.coinLevelArr;
    let coins = '';

    data = data.map((val, ind) => {
      coins = val.KVDataList[0].value;
      unit = coins.substr(-1);
      if ((index = coinLevelArr.indexOf(unit)) !== -1) {
        coins = coins.substr(0, coins.length - 2);
      }
      val.unitIndex = index > 0 ? index : 0;
      val.coins = Number(coins);
      return val;
    }).sort((a, b) => {
      if (a.unitIndex > b.unitIndex || (a.unitIndex === b.unitIndex && a.coins > b.coins)) return -1;
      else if (a.unitIndex === b.unitIndex && a.coins === b.coins) return 0;
      else return 1;
    });

    return data;
  }

  friendListRender(cell, index) {
    if (index > this.rank_friend_list.array.length) return;

    let item = this.rank_friend_list.array[index];

    let itemName = cell.getChildByName("rank_item_name");
    let itemNum = cell.getChildByName("rank_num");
    let itemNumImg = cell.getChildByName("rank_num_img");
    let itemCoin = cell.getChildByName("rank_item_coin");
    let itemAvatal = cell.getChildByName("rank_item_avatal"); 
    //rank_num

    itemName.text = item.nickname;
    itemNum.text = index + 1;
    itemNumImg.skin = `openData/image/rank_${index < 3 ? (index + 1) : 4}.png`;

    itemCoin.text = item.KVDataList[0].value;
    itemAvatal.skin = item.avatarUrl;
  }

  // 获取自己的排名
  getMyPos(data) {
    wx.getUserInfo({
      openIdList: ['selfOpenId'],
      success: (res) => {
        let myInfo = res.data[0];
        let i = 0;

        for (; i < data.length; i++) {
          if (myInfo.nickName === data[i].nickname && myInfo.avatarUrl === data[i].avatarUrl) break;
        }
        this.renderMyData(data[i], i);
      }
    })
    // let openId = 
  }

  renderMyData(data, index) {
    let box = this.friend_self_box;
    let selfName = box.getChildByName('rank_self_name');
    let selfCoin = box.getChildByName('rank_self_coin');
    let selfNum = box.getChildByName('rank_self_num');
    let selfAvatar = box.getChildByName('rank_self_avatal');

    selfCoin.text = data.KVDataList[0].value;
    selfName.text = data.nickname;
    selfNum.text = index || index === 0 ? `第${index + 1}名` : '未上榜';
    selfAvatar.skin = data.avatarUrl;

  }

  sortarr(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        if (+arr[j].KVDataList[0].value < +arr[j + 1].KVDataList[0].value) {
          var temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  }
}