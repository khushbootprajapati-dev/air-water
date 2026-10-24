
/* ================================
   AIR & WATER QUALITY AWARENESS
   PROFESSIONAL WEBSITE CSS
================================ */

/* ---------- BASIC RESET ---------- */

* {
    margin: 0;
    padding: 0;
    box- sizing: border - box;
scroll - behavior: smooth;
}

body {
    font - family: "Segoe UI", Arial, sans - serif;
    color: #17324d;
    background: #ffffff;
    line - height: 1.6;
    overflow - x: hidden;
}


/* ---------- NAVIGATION ---------- */

.navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100 %;
    z - index: 1000;

    display: flex;
    justify - content: space - between;
    align - items: center;

    padding: 18px 7 %;

    background: rgba(255, 255, 255, 0.92);
    backdrop - filter: blur(12px);

    box - shadow: 0 4px 20px rgba(0, 80, 100, 0.08);
}

.logo {
    font - size: 22px;
    font - weight: 700;
    color: #087f8c;
}

.nav - links {
    display: flex;
    gap: 25px;
}

.nav - links a {
    text - decoration: none;
    color: #17324d;
    font - weight: 600;
    font - size: 15px;

    transition: 0.3s ease;
}

.nav - links a:hover {
    color: #08a88a;
}


/* ---------- HERO SECTION ---------- */

.hero {
    min - height: 100vh;

    position: relative;
    overflow: hidden;

    display: flex;
    align - items: center;

    padding: 120px 8 % 70px;

    background:
    linear - gradient(135deg,
        #dff9f4 0 %,
        #e7f8ff 50 %,
        #f5fff9 100 %);
}

.hero - content {
    max - width: 650px;
    z - index: 5;

    animation: fadeUp 1.2s ease;
}

.small - title {
    color: #078c87;
    font - weight: 700;
    letter - spacing: 3px;
    font - size: 14px;
    margin - bottom: 15px;
}

.hero h1 {
    font - size: clamp(45px, 7vw, 82px);
    line - height: 1.05;
    color: #123b56;
    margin - bottom: 25px;
}

.hero h1 span {
    display: block;
    color: #079c82;
}

.hero - content > p: not(.small - title) {
    font - size: 20px;
    max - width: 550px;
    color: #496675;
    margin - bottom: 30px;
}


/* ---------- BUTTONS ---------- */

.hero - buttons {
    display: flex;
    gap: 15px;
    flex - wrap: wrap;
}

.btn {
    display: inline - block;

    text - decoration: none;
    padding: 14px 27px;

    border - radius: 30px;

    background: linear - gradient(135deg, #079c82, #087f9b);
    color: white;

    font - weight: 700;

    box - shadow: 0 10px 25px rgba(0, 140, 130, 0.25);

    transition: 0.3s ease;
}

.btn:hover {
    transform: translateY(-4px);
    box - shadow: 0 15px 30px rgba(0, 140, 130, 0.35);
}

.btn.secondary {
    background: white;
    color: #087f8c;
    border: 2px solid #087f8c;
}


/* ---------- HERO NATURE ---------- */

.nature - illustration {
    position: absolute;
    right: 8 %;
    bottom: 5 %;

    width: 430px;
    height: 430px;

    border - radius: 50 %;

    background: rgba(255, 255, 255, 0.55);

    box - shadow:
    0 25px 70px rgba(0, 100, 120, 0.12);

    animation: float 5s ease -in -out infinite;
}

.sun {
    position: absolute;
    top: 45px;
    right: 55px;
    font - size: 70px;

    animation: spinSlow 12s linear infinite;
}

.cloud {
    position: absolute;
    top: 95px;
    left: 35px;
    font - size: 75px;

    animation: cloudMove 5s ease -in -out infinite;
}

.tree {
    position: absolute;
    bottom: 75px;
    left: 100px;
    font - size: 130px;
}

.water - wave {
    position: absolute;
    bottom: 45px;
    left: 55px;

    color: #159fc0;
    font - size: 40px;

    animation: waveMove 2s ease -in -out infinite;
}


/* ---------- FLOATING PARTICLES ---------- */

.air - particles {
    position: absolute;
    top: 30 %;
    left: 5 %;

    font - size: 30px;
    letter - spacing: 25px;

    color: rgba(0, 150, 160, 0.25);

    animation: particlesFloat 4s ease -in -out infinite;
}


/* ---------- GENERAL SECTION ---------- */

.section {
    padding: 100px 8 %;
    background: #ffffff;
}

.light - section {
    background: #f2fbfa;
}

.section - title {
    text - align: center;
    max - width: 750px;
    margin: 0 auto 55px;
}

.section - title p {
    color: #079c82;
    font - weight: 700;
    letter - spacing: 2px;
    font - size: 13px;
    margin - bottom: 8px;
}

.section - title h2 {
    font - size: clamp(30px, 4vw, 48px);
    color: #123b56;
}


/* ---------- ABOUT CARDS ---------- */

.about - grid {
    max - width: 1100px;
    margin: auto;

    display: grid;
    grid - template - columns: repeat(3, 1fr);
    gap: 25px;
}

.about - card {
    padding: 35px 28px;

    background: white;

    border - radius: 22px;

    box - shadow: 0 15px 40px rgba(0, 80, 100, 0.09);

    text - align: center;

    transition: 0.4s ease;
}

.about - card:hover {
    transform: translateY(-12px);
    box - shadow: 0 25px 50px rgba(0, 130, 130, 0.18);
}

.icon {
    font - size: 50px;
    margin - bottom: 18px;

    animation: iconFloat 3s ease -in -out infinite;
}

.about - card h3 {
    margin - bottom: 10px;
    color: #087f8c;
}


/* ---------- CONTENT ROW ---------- */

.content - row {
    max - width: 1100px;
    margin: auto;

    display: grid;
    grid - template - columns: 1fr 1fr;
    gap: 45px;

    align - items: center;
}

.content - box {
    padding: 35px;

    background: white;

    border - radius: 22px;

    box - shadow: 0 15px 40px rgba(0, 80, 100, 0.08);

    transition: 0.3s ease;
}

.content - box:hover {
    transform: translateY(-6px);
}

.content - box h3 {
    color: #087f8c;
    margin - bottom: 15px;
}

.content - box ul {
    margin - top: 20px;
    list - style: none;
}

.content - box li {
    margin: 12px 0;
}


/* ---------- QUALITY METER ---------- */

.quality - meter {
    padding: 35px;

    background: linear - gradient(145deg, #ffffff, #e9fbf8);

    border - radius: 22px;

    box - shadow: 0 15px 40px rgba(0, 80, 100, 0.08);
}

.meter {
    width: 100 %;
    height: 20px;

    background: #d9e9e9;

    border - radius: 20px;

    overflow: hidden;

    margin: 25px 0 15px;
}

.meter - fill {
    height: 100 %;
    width: 0;

    border - radius: 20px;

    background: linear - gradient(90deg, #f3c34f, #f28c28);

    animation: meterFill 2s ease forwards;
}

.quality - meter strong {
    color: #e47725;
}


/* ---------- WATER ANIMATION ---------- */

.water - animation {
    min - height: 300px;

    display: flex;
    align - items: center;
    justify - content: center;

    position: relative;

    font - size: 130px;

    background: linear - gradient(145deg, #e2faff, #ffffff);

    border - radius: 30px;

    box - shadow: 0 15px 40px rgba(0, 100, 150, 0.1);
}

.drop {
    position: absolute;

    top: 10px;
    left: 25 %;

    font - size: 40px;

    animation: dropFall 3s linear infinite;
}

.drop2 {
    left: 70 %;
    animation - delay: 1.5s;
}


/* ---------- PROBLEM CARDS ---------- */

.problem - grid {
    max - width: 1100px;
    margin: auto;

    display: grid;
    grid - template - columns: repeat(4, 1fr);
    gap: 20px;
}

.problem - card {
    padding: 30px 20px;

    background: white;

    border - radius: 20px;

    text - align: center;

    box - shadow: 0 12px 30px rgba(0, 80, 100, 0.08);

    transition: 0.35s ease;
}

.problem - card:hover {
    transform: translateY(-10px) scale(1.02);
}

.problem - card span {
    font - size: 45px;
    display: block;
    margin - bottom: 15px;
}

.problem - card h3 {
    color: #087f8c;
    margin - bottom: 10px;
}


/* ---------- SURVEY ---------- */

.survey - section {
    background:
    linear - gradient(135deg, #073b4c, #087f8c);
    color: white;
}

.survey - section.section - title p,
.survey - section.section - title h2 {
    color: white;
}

.survey - box {
    max - width: 750px;
    margin: auto;

    padding: 45px;

    text - align: center;

    background: rgba(255, 255, 255, 0.12);

    border: 1px solid rgba(255, 255, 255, 0.25);

    border - radius: 30px;

    backdrop - filter: blur(12px);

    box - shadow: 0 25px 60px rgba(0, 0, 0, 0.18);
}

.survey - box h3 {
    font - size: 27px;
    margin - bottom: 15px;
}

.survey - stats {
    display: flex;
    justify - content: center;
    gap: 80px;

    margin: 35px 0;
}

.survey - stats div {
    display: flex;
    flex - direction: column;
}

.survey - stats strong {
    font - size: 48px;
    color: #a8ffe9;
}

.survey - stats span {
    font - size: 14px;
}

.survey - btn {
    background: white;
    color: #087f8c;
}

.note {
    margin - top: 20px;
    opacity: 0.8;
    font - size: 14px;
}


/* ---------- SOLUTIONS ---------- */

.solution - grid {
    max - width: 1100px;
    margin: auto;

    display: grid;
    grid - template - columns: repeat(4, 1fr);
    gap: 20px;
}

.solution - card {
    padding: 30px 22px;

    border: 1px solid #dceeed;

    border - radius: 20px;

    text - align: center;

    transition: 0.35s ease;

    background: white;
}

.solution - card:hover {
    transform: translateY(-10px);
    border - color: #079c82;

    box - shadow: 0 18px 40px rgba(0, 130, 130, 0.12);
}

.solution - card span {
    font - size: 45px;
}

.solution - card h3 {
    color: #087f8c;
    margin: 15px 0 8px;
}


/* ---------- STUDENT PROJECT ---------- */

.student - section {
    padding: 90px 8 %;

    background:
    linear - gradient(135deg, #e7faf5, #e7f7ff);
}

.student - card {
    max - width: 900px;
    margin: auto;

    padding: 50px;

    text - align: center;

    background: white;

    border - radius: 30px;

    box - shadow: 0 20px 50px rgba(0, 80, 100, 0.1);
}

.student - card > p {
    color: #079c82;
    font - weight: 700;
    letter - spacing: 2px;
}

.student - card h2 {
    margin: 12px 0 35px;
    color: #123b56;
}

.student - details {
    display: grid;
    grid - template - columns: repeat(3, 1fr);
    gap: 20px;
}

.student - details div {
    padding: 20px;

    background: #f1fbf9;

    border - radius: 15px;
}

.student - details span,
.student - details strong {
    display: block;
}

.student - details span {
    color: #66818b;
    font - size: 13px;
    margin - bottom: 5px;
}

.student - details strong {
    color: #087f8c;
}


/* ---------- FOOTER ---------- */

footer {
    padding: 45px 8 %;

    text - align: center;

    background: #092f40;

    color: white;
}

footer h3 {
    font - size: 23px;
    margin - bottom: 8px;
}

footer p {
    color: #b9d7dc;
}

.copyright {
    margin - top: 20px;
    font - size: 13px;
}


/* =================================
   ANIMATIONS
================================= */

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(40px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes float {
    0 %, 100 % {
        transform: translateY(0);
    }

    50 % {
        transform: translateY(-18px);
    }
}

@keyframes cloudMove {
    0 %, 100 % {
        transform: translateX(0);
    }

    50 % {
        transform: translateX(35px);
    }
}

@keyframes spinSlow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

@keyframes waveMove {
    0 %, 100 % {
        transform: translateX(0);
    }

    50 % {
        transform: translateX(20px);
    }
}

@keyframes particlesFloat {
    0 %, 100 % {
        transform: translateY(0);
    }

    50 % {
        transform: translateY(-20px);
    }
}

@keyframes iconFloat {
    0 %, 100 % {
        transform: translateY(0);
    }

    50 % {
        transform: translateY(-8px);
    }
}

@keyframes meterFill {
    from {
        width: 0;
    }

    to {
        width: 65 %;
    }
}

@keyframes dropFall {
    0 % {
        transform: translateY(-30px);
        opacity: 0;
    }

    20 % {
        opacity: 1;
    }

    100 % {
        transform: translateY(250px);
        opacity: 0;
    }
}


/* =================================
   RESPONSIVE DESIGN
================================= */

@media(max - width: 900px) {

    .navbar {
        padding: 15px 5 %;
    }

    .nav - links {
        gap: 12px;
    }

    .nav - links a {
        font - size: 12px;
    }

    .nature - illustration {
        opacity: 0.35;
        right: -100px;
    }

    .about - grid,
    .problem - grid,
    .solution - grid {
        grid - template - columns: repeat(2, 1fr);
    }

    .content - row {
        grid - template - columns: 1fr;
    }

    .student - details {
        grid - template - columns: 1fr;
    }
}


@media(max - width: 600px) {

    .navbar {
        position: relative;

        flex - direction: column;
        gap: 12px;
    }

    .nav - links {
        flex - wrap: wrap;
        justify - content: center;
    }

    .hero {
        padding - top: 70px;
        text - align: center;
    }

    .hero - content {
        margin: auto;
    }

    .hero - buttons {
        justify - content: center;
    }

    .nature - illustration {
        display: none;
    }

    .about - grid,
    .problem - grid,
    .solution - grid {
        grid - template - columns: 1fr;
    }

    .survey - stats {
        gap: 35px;
    }

    .survey - box {
        padding: 30px 20px;
    }

    .student - card {
        padding: 35px 20px;
    }
}