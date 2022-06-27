// totalCallDuration||TotalCallDuration => Total Call Duration
export const handleString = str => {
    if (str.length > 0) {
        const newReg = /^[A-Z]+$/;
        const strArr = [];
        for (let i = 0; i < str.length; i++) {
            strArr.push(str[i]);
        }
        let newStr = '';
        strArr.forEach((item, index) => {
            if (newReg.test(item)) {
                newStr += ' ' + item;
            } else {
                if (index === 0) {
                    newStr = item.toUpperCase();
                } else {
                    newStr += item;
                }
            }
        });
        str = newStr.trim();
    }
    return str;
};

// 12=>00:00:12
export const handleTime = times => {
    let result = '00:00:00';
    let hour, minute, second;
    if (times > 0) {
        hour = Math.floor(times / 3600);
        if (hour < 10) {
            hour = '0' + hour;
        }
        minute = Math.floor((times - 3600 * hour) / 60);
        if (minute < 10) {
            minute = '0' + minute;
        }

        second = Math.floor((times - 3600 * hour - 60 * minute) % 60);
        if (second < 10) {
            second = '0' + second;
        }
        result = hour + ':' + minute + ':' + second;
    }
    return result;
};

// utf-8 =>string
export const utf82String = szInput => {
    let x;
    let wch;
    let wch1;
    let wch2;
    let szRet = '';
    for (x = 0; x < szInput.length; x++) {
        if (szInput.charAt(x) === '%') {
            wch = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
            if (!wch) {
                break;
            }
            if (!(wch & 0x80)) {
                // wch = wch
            } else if (!(wch & 0x20)) {
                x++;
                wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
                wch = (wch & 0x1f) << 6;
                wch1 = wch1 & 0x3f;
                wch = wch + wch1;
            } else {
                x++;
                wch1 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
                x++;
                wch2 = parseInt(szInput.charAt(++x) + szInput.charAt(++x), 16);
                wch = (wch & 0x0f) << 12;
                wch1 = (wch1 & 0x3f) << 6;
                wch2 = wch2 & 0x3f;
                wch = wch + wch1 + wch2;
            }
            szRet += String.fromCharCode(wch);
        } else {
            szRet += szInput.charAt(x);
        }
    }
    return szRet;
};

//   utf16=>outf8
export const utf162outf8 = (str) => {
    var out, i, len, c;
    var char2, char3;
    out = '';
    len = str.length;
    i = 0;
    while (i < len) {
        c = str.charCodeAt(i++);
        switch (c >> 4) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
                out += str.charAt(i - 1);
                break;
            case 12:
            case 13:
                // 110x xxxx 10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
                break;
            case 14:
                // 1110 xxxx 10xx xxxx 10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(
                    ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
                );
                break;
            default:
                break;
        }
    }
    return out;
};

// 设置websocket
export const setWebSocket = (cb = console.log) => {
    cb('coming')
    // 判断当前浏览器是否支持webSocket
    if ('WebSocket' in window) {
        let webSocket = new WebSocket('ws://localhost:8000');
        // 连接失败时候的回调
        webSocket.onerror = (event) => {
            cb('webSocket连接失败');
        };
        // 连接成功时候的回调
        webSocket.onopen = (event) => {
            cb('webSocket连接成功');
        };
        // webSocket返回的消息
        webSocket.onmessage = (event) => {

        };
        // 连接关闭的回调方法
        webSocket.onclose = () => {
            webSocket.close();
            webSocket = null
        };
        // 监听窗口关闭时间，关闭webSocket ,否者服务端可能报错
        window.onbeforeunload = () => {
            webSocket.close();
            webSocket = null
        };

        return webSocket
    } else {
        cb('该浏览器不支webSocket!');
    }
}

export const copy = (value) => {
    let transfer = document.createElement('input');
    document.body.appendChild(transfer);
    transfer.value = value  // 这里表示想要复制的内容
    transfer.focus();
    transfer.select();
    if (document.execCommand('copy')) {
        document.execCommand('copy');
    }
    transfer.blur();
    document.body.removeChild(transfer);
}

export const GetRandomNum = (Min, Max) => {
    let Range = Max - Min;
    let Rand = Math.random();
    return (Min + Math.round(Rand * Range));
}

export const getRandomChineseWord = () => {
    var _rsl = "";
    var _randomUniCode = Math.floor(Math.random() * (40870 - 19968) + 19968).toString(16);
    eval("_rsl=" + '"\\u' + _randomUniCode + '"');
    return _rsl;
}

// 递归查找数据
export const deepFindData = (array, payload = { target: null, value: null }, result) => {
    if (array.length <= 0) {
        return
    }
    for (let i = 0; i < array.length; i++) {
        if (array[i][payload.target] === payload.value) {
            result = array[i]
            return result
        }
        if (array[i].children?.length > 0) {
            let _result = deepFindData(array[i].children, payload)
            if (_result) return _result
        }
    }
}