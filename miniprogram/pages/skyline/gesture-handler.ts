// demo-drag/index.js
import {
    GestureState
} from '../../utils/util'

const {
    shared,
    spring
} = wx.worklet;

Page<any,any>({

    /**
     * 页面的初始数据
     */
    data: {
        x:shared(0),
        y:shared(0),
        scale:shared(1),
        pressed:shared(false)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options:any) {
        const x = shared(0);
        const y = shared(0);
        const scale = shared(1);
        const pressed = shared(false);
        this.applyAnimatedStyle('.circle', () => {
            'worklet';
            return {
                backgroundColor: pressed.value ? '#5f9ea0' : '#adff2f',
                transform: `translate(${x.value}px, ${y.value}px) scale(${scale.value})`,
            };
        });
        this.data.x = x;
        this.data.y = y;
        this.data.scale = scale
        this.data.pressed = pressed;
    },

    handlepan(evt:any) {
        'worklet';
        if (evt.state === GestureState.POSSIBLE) {
            this.data.pressed.value = true
            this.data.scale.value = spring(1.2);
        } else if (evt.state === GestureState.END || evt.state === GestureState.CANCELLED) {
            this.data.pressed.value = false
            this.data.scale.value = spring(1);
            this.data.x.value = spring(0);
            this.data.y.value = spring(0);
        } else if (evt.state === GestureState.ACTIVE) {
            this.data.x.value += evt.deltaX;
            this.data.y.value += evt.deltaY;
        }
    },


    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})