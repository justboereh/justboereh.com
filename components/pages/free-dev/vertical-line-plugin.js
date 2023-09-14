export default {
    id: 'vertical-line',
    getLinePosition: (c, i) => c.getDatasetMeta(0).data[i].x,
    renderVerticalLine: function (c, i) {
        const offset = this.getLinePosition(c, i)
        const scale = c.scales.y
        const context = c.ctx

        context.beginPath()
        context.strokeStyle = '#fff'
        context.moveTo(offset, scale.top)
        context.lineTo(offset, scale.bottom)
        context.stroke()
    },

    afterDatasetsDraw: function (c) {
        const arr = c.config.options.lineAtIndex

        if (arr) arr.forEach((i) => this.renderVerticalLine(c, i))
    },
}
