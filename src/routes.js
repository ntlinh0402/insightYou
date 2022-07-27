module.exports = {
    //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
    //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
    //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
    "GET /home": { action: "view-home" },
    "GET /logout": { action: "logout" },
    "GET /404": { action: "404" },
    "GET /500": { action: "500" },
    "GET /login": { action: "view-login" },
    "GET /register": { action: "view-register" },
    "GET /blog-item": { action: "view-blog-item" },
    "GET /blog-item2": { action: "view-blog-item2" },
    "GET /blog-item3": { action: "view-blog-item3" },


    "GET /blog": { action: "view-blog" },
    "GET /mood": { action: "view-mood" },
    "GET /quiz": { action: "view-quiz" },
    "GET /quotes": { action: "view-quotes" },
    "GET /song": { action: "view-song" },
    "GET /resetpwd": {action: "view-resetpwd"},

    //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
    //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
    //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
    "/": "/home"
}