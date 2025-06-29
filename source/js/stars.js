!function() {
    function t() {
        i(),
            a()
    }
    function i() {
        document.addEventListener("mousemove", o),
            document.addEventListener("touchmove", e),
            document.addEventListener("touchstart", e),
            window.addEventListener("resize", n)
    }
    function n(t) {
        d = window.innerWidth,
            window.innerHeight
    }
    function e(t) {
        if (t.touches.length > 0) for (var i = 0; i < t.touches.length; i++) s(t.touches[i].clientX, t.touches[i].clientY, r[Math.floor(Math.random() * r.length)])
    }
    function o(t) {
        f.x = t.clientX,
            f.y = t.clientY,
            s(f.x, f.y, r[Math.floor(Math.random() * r.length)])
    }
    function s(t, i, n) {
        var e = new l;
        e.init(t, i, n),
            u.push(e)
    }
    function h() {
        for (var t = 0; t < u.length; t++) u[t].update();
        for (t = u.length - 1; t >= 0; t--) u[t].lifeSpan < 0 && (u[t].die(), u.splice(t, 1))
    }
    function a() {
        requestAnimationFrame(a),
            h()
    }
    function l() {
        this.character = "*",
            this.lifeSpan = 120,
            this.initialStyles = {
                position: "fixed",
                top: "0",
                display: "block",
                pointerEvents: "none",
                "z-index": "10000000",
                fontSize: "20px",
                "will-change": "transform"
            },
            this.init = function(t, i, n) {
                this.velocity = {
                    x: (Math.random() < .5 ? -1 : 1) * (Math.random() / 2),
                    y: 1
                },
                    this.position = {
                        x: t - 10,
                        y: i - 20
                    },
                    this.initialStyles.color = n,
                    this.element = document.createElement("span"),
                    this.element.innerHTML = this.character,
                    c(this.element, this.initialStyles),
                    this.update(),
                    document.body.appendChild(this.element)
            },
            this.update = function() {
                this.position.x += this.velocity.x,
                    this.position.y += this.velocity.y,
                    this.lifeSpan--,
                    this.element.style.transform = "translate3d(" + this.position.x + "px," + this.position.y + "px,0) scale(" + this.lifeSpan / 120 + ")"
            },
            this.die = function() {
                this.element.parentNode.removeChild(this.element)
            }
    }
    function c(t, i) {
        for (var n in i) t.style[n] = i[n]
    }
    var r = ["#f94a70", "#ffd12b", "#49c99a", "#1f90ed"],
        d = window.innerWidth,
        f = (window.innerHeight, {
            x: d / 2,
            y: d / 2
        }),
        u = [];
    t()
} ();