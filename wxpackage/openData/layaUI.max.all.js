var CLASS$ = Laya.class;
var STATICATTR$ = Laya.static;
var View = laya.ui.View;
var rankUI = (function (_super) {
	function rankUI() {

		this.friend_self_box = null;
		this.rank_friend_list = null;

		rankUI.__super.call(this);
	}

	CLASS$(rankUI, 'ui.pages.rankUI', _super);
	var __proto__ = rankUI.prototype;
	__proto__.createChildren = function () {
		View.regComponent("Text", laya.display.Text);

		laya.ui.Component.prototype.createChildren.call(this);
		this.createView(rankUI.uiView);

	}

	rankUI.uiView = { "type": "View", "props": { "width": 750, "height": 1334 }, "child": [{ "type": "Box", "props": { "y": 376, "x": 85, "width": 560 }, "child": [{ "type": "Box", "props": { "y": 0, "x": 0, "width": 560, "var": "friend_self_box", "height": 140 }, "child": [{ "type": "Image", "props": { "y": 65, "x": 361, "width": 134, "skin": "openData/image/icon_item.png", "height": 46 } }, { "type": "Image", "props": { "y": 27, "x": 231, "width": 100, "visible": true, "name": "rank_self_avatal", "height": 100 } }, { "type": "Image", "props": { "y": 15, "x": 220, "skin": "openData/image/avatal_self.png" } }, { "type": "Text", "props": { "y": 61, "x": 48, "width": 160, "overflow": "hidden", "name": "rank_self_name", "height": 30, "fontSize": 30, "font": "Arial", "color": "#9B5C0A", "bold": true, "align": "center" } }, { "type": "Text", "props": { "y": 78, "x": 402, "width": 80, "name": "rank_self_coin", "fontSize": 20, "font": "Arial", "color": "#9B5C0A", "bold": true, "align": "center" } }, { "type": "Text", "props": { "y": 32, "x": 363, "width": 130, "overflow": "hidden", "name": "rank_self_num", "height": 26, "fontSize": 26, "font": "Arial", "color": "#9B5C0A", "bold": true, "align": "center" } }] }, { "type": "List", "props": { "y": 151, "var": "rank_friend_list", "repeatY": 1, "repeatX": 1, "height": 600 }, "child": [{ "type": "Box", "props": { "width": 557, "renderType": "render", "height": 120 }, "child": [{ "type": "Image", "props": { "y": 38, "x": 340, "skin": "openData/image/icon_item.png" } }, { "type": "Image", "props": { "y": 62, "x": 91, "skin": "openData/image/avatal_item.png", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 62, "x": 91, "width": 94, "name": "rank_item_avatal", "height": 94, "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Image", "props": { "y": 62, "x": 91, "skin": "openData/image/rank_1.png", "name": "rank_num_img", "anchorY": 0.5, "anchorX": 0.5 } }, { "type": "Text", "props": { "y": 30, "x": 155, "visible": false, "text": "昵称：", "height": 28, "fontSize": 26, "font": "Arial", "color": "#9B5C0A", "bold": true, "align": "left" } }, { "type": "Text", "props": { "y": 53, "x": 175, "width": 149, "overflow": "scroll", "name": "rank_item_name", "height": 26, "fontSize": 26, "font": "Arial", "color": "#9B5C0A", "bold": true } }, { "type": "Text", "props": { "y": 56, "x": 397, "width": 110, "name": "rank_item_coin", "fontSize": 26, "font": "Arial", "color": "#9B5C0A", "bold": true, "align": "center" } }, { "type": "Image", "props": { "y": 72, "x": 38, "skin": "openData/image/rank_num.png" } }, { "type": "Text", "props": { "y": 79, "x": 41, "width": 40, "text": "1", "name": "rank_num", "height": 30, "fontSize": 30, "font": "Arial", "color": "#9B5C0A", "bold": true, "align": "center" } }] }] }] }] };
	return rankUI;
})(View);
