const emoji = {
    smileys: '😀😁😂🤣😃😄😅😆😉😊😋😎😍😘😗😙😚🙂🤗🤩🤔🤨😐😑😶🙄😏😣😥😮🤐😯😪😫😴😌😛😜😝🤤😒😓😔' +
             '😕🙃🤑😲☹️🙁😖😞😟😤😢😭😦😧😨😩🤯😬😰😱😳🤪😵😡😠🤬😷🤒🤕🤢🤮🤧😇🤠🤡🤥🤫🤭🧐🤓😈👿👹' +
             '👺💀👻👽🤖💩😺😸😹😻😼😽🙀😿😾',
    fantasy: '👶👧🧒👦👩🧑👨👵🧓👴👲👳🧕👮👷💂🕵👩👨👰🤵👸🤴🤶🎅🧙🧝🧛🧟🧞🧜🧚👼🤰🤱🙇💁🙅🙆🙋🤦🤷🙎' +
             '🙍💇💆🧖💅🤳💃🕺👯🕴🚶🏃👫👭👬🤲👐🙌👏🤝👍👎👊✊🤛🤜🤞✌🤟🤘👌👈👉👆👇☝✋🤚🖐🖖👋🤙💪' +
             '🖕✍🙏💍💄💋👄👂👃👣👁👀🧠',
    clothing: '🧥👚👕👖👔👗👙👘👠👡👢👞👟🧦🧤🧣🎩🧢👒🎓⛑👑👝👛👜💼🎒👓🕶🌂',
    animals: '🐶🐱🐭🐹🐰🦊🐻🐼🐨🐯🦁🐮🐷🐽🐸🐵🙈🙉🙊🐒🐔🐧🐦🐤🐣🐥🦆🦅🦉🦇🐺🐗🐴🦄🐝🐛🦋🐌🐚🐞🐜🦗🕷' +
             '🕸🦂🐢🐍🦎🦖🦕🐙🦑🦐🦀🐡🐠🐟🐬🐳🐋🦈🐊🐅🐆🦓🦍🐘🦏🐪🐫🦒🐃🐂🐄🐎🐖🐏🐑🐐🦌🐕🐩🐈🐓🦃🕊' +
             '🐇🐁🐀🐿🦔🐾🐉🐲',
    nature: '🌵🎄🌲🌳🌴🌱🌿☘🍀🎍🎋🍃🍂🍁🍄🌾💐🌷🌹🥀🌺🌸🌼🌻🌞🌝🌛🌜🌚🌕🌖🌗🌘🌑🌒🌓🌔🌙🌎🌍🌏💫⭐🌟' +
            '✨⚡☄💥🔥🌪🌈🌤⛅🌥☁🌦🌧⛈🌩🌨❄️🌬💨💧💦☔🌊',
    food: '🍏🍎🍐🍊🍋🍌🍉🍇🍓🍈🍒🍑🍍🥥🥝🍅🍆🥑🥦🥒🌶🌽🥕🥔🍠🥐🍞🥖🥨🧀🥚🍳🥞🥓🥩🍗🍖🌭🍔🍟🍕🥪🥙🌮🌯' +
          '🥗🥘🥫🍝🍜🍲🍛🍣🍱🥟🍤🍙🍚🍘🍥🥠🍢🍡🍧🍨🍦🥧🍰🎂🍮🍭🍬🍫🍿🍩🍪🌰🥜🍯🥛🍼☕️🍵🥤🍶🍺🍻🥂🍷🥃' +
          '🍸🍹🍾🥄🍴🍽🥣🥡🥢',
    sport: '⚽️🏀🏈⚾🎾🏐🏉🎱🏓🏸🥅🏒🏑🏏⛳🏹🎣🥊🥋🎽⛸🥌🛷🎿⛷🏂🏋️‍🤼‍🤸⛹🤺🤾🏌🏇🧘🏄🏊🤽🚣🧗🚵🚴🏆🥇🥈' +
           '🥉🏅🎖🏵🎗🎫🎟🎪🤹🎭🎨🎬🎤🎧🎼🎹🥁🎷🎺🎸🎻🎲🎯🎳🎮🎰',
    travel: '🚗🚕🚙🚌🚎🏎🚓🚑🚒🚐🚚🚛🚜🛴🚲🛵🏍🚨🚔🚍🚘🚖🚡🚠🚟🚃🚋🚞🚝🚄🚅🚈🚂🚆🚇🚊🚉🛫🛬🛩💺🛰🚀🛸' +
            '🚁🛶⛵🚤🛥🛳⛴🚢⚓⛽🚧🚦🚥🚏🗺🗿🗽🗼🏰🏯🏟🎡🎢🎠⛲⛱🏖🏝🏜🌋⛰🏔🗻🏕⛺🏠🏡🏘🏚🏗🏭🏢🏬🏣' +
            '🏤🏥🏦🏨🏪🏫🏩💒🏛⛪🕌🕍🕋⛩🛤🛣🗾🎑🏞🌅🌄🌠🎇🎆🌇🌆🏙🌃🌌🌉🌁',
    objects: '⌚️📱📲💻⌨🖥🖨🖱🖲🕹🗜💽💾💿📀📼📷📸📹🎥📽🎞📞📟📠📺📻🎙🎚🎛⏱⏲⏰🕰⌛⏳📡🔋🔌💡🔦🕯🗑🛢' +
             '💸💵💴💶💷💰💳💎⚖🔧🔨⚒🛠⛏🔩⚙⛓🔫💣🔪🗡⚔🛡🚬⚰⚱🏺🔮📿💈⚗🔭🔬🕳💊💉🌡🚽🚰🚿🛁🛀🛎🔑' +
             '🗝🚪🛋🛏🛌🖼🛍🛒🎁🎈🎏🎀🎊🎉🎎🏮🎐📩📨📧💌📥📤📦🏷📪📫📬📭📮📯📜📃📄📑📊📈📉🗒🗓📆📅📇🗃' +
             '🗳🗄📋📁📂🗂🗞📰📓📔📒📕📗📘📙📚📖🔖🔗📎🖇📐📏📌📍🖊🖋🖌🖍📝🔍🔎🔏🔐🔒🔓',
    symbols: '❤️🧡💛💚💙💜🖤💔💕💞💓💗💖💘💝❌⭕⛔🚫💯💢❗❓🎵🎶➕➖💲⚫🔴🔵🔈🔇🔉🔊🔔🔕📣📢👁💬💭🗯🃏' +
             '🎴🀄🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚🕛🕜🕝🕞🕟🕠🕡🕢🕣🕤🕥🕦🕧'
};

export default emoji;