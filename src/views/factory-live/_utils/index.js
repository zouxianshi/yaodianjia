export function formartTime (seconds) {
    let h = parseInt(seconds/3600) + ''
    let m = (parseInt((seconds%3600)/60) + '').padStart(2,'0')
    let s = (parseInt((seconds%3600)%60) + '').padStart(2,'0')
    return `${h}:${m}:${s}`
}