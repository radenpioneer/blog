const outdent = require('outdent')({ newline: ' ' })

module.exports = (id) => {
    return outdent`
    <amp-iframe
    src="https://open.spotify.com/embed-podcast/episode/${id}"
    sandbox="allow-scripts allow-same-origin allow-forms"
    layout="fixed-height"
    width="auto" height="232"
    frameborder="0"
    allow="encrypted-media">
        <amp-fit-text
        layout="fixed-height"
        width="auto" height="232"
        max-font-size="18"
        class="mute center"
        style="z-index: -1;"
        placeholder>
            memuat audio...
        </amp-fit-text>
    </amp-iframe>`
}