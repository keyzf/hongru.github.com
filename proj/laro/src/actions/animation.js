/** 
 * Laro (Game Engine Based on Canvas) 
 * Code licensed under the MIT License:
 *
 * @fileOverview Laro
 * @version 1.0
 * @author  Hongru
 * @description 
 * 
 */
 
/** 
 * @description
 * Package: Laro.action
 */

Laro.register('.action', function (La) {

	var Class = La.Class || La.base.Class,
		extend = La.extend;

	/**
     * 帧动画信息 类
     * @class 

	 * @memberOf Laro
     * @name Animation
     * @constructor
     * 
     * @param {Object} anim: 从json配置里面获取的anim 配置
			{
				"nbrOfFrames": 73,
				"name": "TimeTrap",
				"atlas": "atlas/game/timetrap",
				"type": "animation",
				"image": "anims/timetrap.png",
				"pivoty": 128,
				"framerate": 30,
				"pivotx": 256,
				"events": []
			}
     * @param {Array} frames: 从json配置文件里面获得的每帧的位置信息
     * @return 帧动画信息实例
     */

	var Animation = Class(function (anim, frames) {
		extend(this, anim);

		this.frames = frames;
		if (anim.framerate == undefined) anim.framerate = 20;
		// 这个动画执行需要的时间
		this.animationLength = frames.length / anim.framerate;
	}).methods({
	/**
     * @lends Laro.Animation.prototype
     */ 

		/**
		 * 获取动画时间内指定时间段[from, to]中插入的事件
		 * @param {Number} from: 起始时间
		 * @param {Number} to: 结束时间
		 * @return {Array} 指定时间区间内事件列表
		 */
		getEvents: function (from, to) {
			var events = [];
			for (var e = 0; e < this.events.length; e ++) {
				var evt = this.events[e];
				if (evt.time >= from && evt.time < to) {
					events.push(evt.name);
				}
			}
			return events;
		},
		/**
		 * 获取下一个动画内（指定时间段内）插入事件的触发具体时间
		 * @param {Number} from: 起始时间
		 * @param {Number} to: 结束时间
		 * @return {Number} 插入事件的触发具体时间点
		 */
		getTimeForNextEvent: function (from, to) {
			var first = -1;
			for (var e = 0; e < this.events.length; e ++) {
				var evt = this.events[e];
				if (evt.time > from && evt.time < to) {
					if (first != -1) return first;
					first = evt.time;
				}
			}
			return first;
		},
		/**
		 * 给定两个时间区间，如果有交集，交集中的事件push两次
		 */ 
		getEventsSlow: function (from, to, start, end, dt) {
			var events = [],
				e,
				evt;
			for (e = 0; e < this.events.length; e++) {
				evt = this.events[e];
				if (evt.time >= from && evt.time < end) {
					events.push(evt.name);
				}
			}

			for (e = 0; e < this.events.length; e ++) {
				evt = this.events[e];
				if (evt.time >= start && evt.time < to) {
					events.push(evt.name);
				}
			}

			return events;
		}
	});

	this.Animation = Animation;
	Laro.extend(this);
		
})
