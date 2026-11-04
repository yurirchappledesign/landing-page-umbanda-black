(function () {
  "use strict";
  var $ = function (s) { return document.querySelector(s); };
  var rand = function (a, b) { return a + Math.floor(Math.random() * (b - a + 1)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- Ícones ---------- */
  var ICON = {
    check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    spark: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z"/></svg>',
    eye: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
    users: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/></svg>',
    ok: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
    arrow: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>',
    insta: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
    whats: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.1-.2.3-.8.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>',
    play: '<svg width="26" height="26" viewBox="0 0 24 24" fill="white"><path d="M7 4v16l13-8z"/></svg>',
    left: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m15 18-6-6 6-6"/></svg>',
    right: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>'
  };

  /* ---------- Conteúdo ---------- */
  var LEARN = ["7", "8-1", "12", "6", "1", "5", "8", "3", "11", "10", "13", "9", "2", "4"].map(function (n) { return "assets/card-" + n + ".webp"; });
  var APOSTILAS = ["apostila_livro_ervas_umbanda", "apostila_livro_obsessao", "apostila_mediunidade_livro", "apostila_sensacoes_e_percepcoes_png_livro", "apostila_sensitividade_por_afinidade_png_livro", "apostila_tipos_de_mediunidade_livro", "apostila_umbanda_png_livro", "apostila_habitos_para_o_bom_desenvolvimento_da_mediunidade_png_livro"].map(function (n) { return "assets/" + n + ".webp"; });
  var VALUE_ITEMS = [
    ["Curso de Mediunidade e Sensitividade", "R$497,00"],
    ["Ensinamento como montar altar e fazer banho de Ervas", "R$197,00"],
    ["Como plantar uma defesa energética na sua casa e no seu comércio", "R$97,00"],
    ["Aprendendo a atrair as energias de prosperidade financeira através dos elementais, cristais, ervas, sementes, cromoterapia etc", "R$197,00"],
    ["Aulas ao vivo na prática sobre Umbanda, Espiritualidade, Autoconhecimento e Nova Era Planetária", "R$297,00"],
    ["Conteúdos atualizados de como se prevenir das doenças psicossomáticas, como estresse, ansiedade entre outras", "R$97,00"],
    ["Quais hábitos e preceitos para um bom desenvolvimento mediúnico", "R$97,00"]
  ];
  var EXTRAS = ["Workshops", "Eventos", "Palestras", "Retiros", "Podcasts"];
  var PRICE_LINES = [
    ["Comunidade de Umbanda", "597,00"],
    ["EspiritualFlix", "997,00"],
    ["+80 aulas com mais de 1 hora de duração sobre Umbanda, espiritualidade ao todo e mediunidade", null],
    ["Cursos profissionalizantes com certificado, +20 cursos e aulas na EspiritualFlix", null],
    ["Aulas ao vivo, materiais, apostilas e mentoria", null]
  ];
  var INCLUDES = [
    "Acesso vitalício à Comunidade Umbanda para Todos",
    "Acesso vitalício a todos os cursos e aulas descritos durante o curso gratuito onde o professor apresentou as plataformas",
    "Aplicativo Hotmart pra você ver as aulas da comunidade pelo seu celular",
    "Plataforma de cursos profissionalizantes com certificação EspiritualFlix",
    "Aulas ao vivo toda semana",
    "Mentoria em grupo com o Sacerdote Edvilson",
    "Participe da seleção de assuntos abordados nos PodCasts",
    "Suporte direto com Professor e Equipe + Grupo da comunidade no Whats",
    "Estude diariamente onde e quando quiser",
    "Acesso aos podcasts novos"
  ];
  var BONUS = [
    "Acesso vitalício à maior plataforma de espiritualidade com diversos cursos profissionalizantes, todos com certificados e apostilas, a EspiritualFlix",
    "Mentoria em grupo com o Sacerdote Edvilson",
    "Apostilas completas da comunidade",
    "Workshops, eventos, palestras, retiros e podcasts",
    "Tudo listado acima"
  ];
  var MARQUEE = ["Umbanda para Todos", "Fundamento", "Respeito", "Amor", "Caridade", "Mediunidade", "Autoconhecimento"];
  var SOCIAL = [
    ["https://instagram.com/edvilsonumbanda", "@edvilsonumbanda", "Instagram Edvilson", "insta"],
    ["https://instagram.com/conexaoestelar_", "@conexaoestelar_", "Instagram Conexão Estelar", "insta"],
    ["https://wa.me/555197926121", "Suporte", "WhatsApp Edvilson", "whats"]
  ];

  /* ---------- Render estático ---------- */
  document.querySelectorAll(".cta").forEach(function (a) {
    var light = a.classList.contains("cta-light");
    a.className = "group inline-flex items-center gap-3 rounded-full px-8 py-4 text-sm font-semibold tracking-[0.14em] uppercase transition-[transform,background-color,box-shadow] duration-500 hover:-translate-y-0.5 " +
      (light ? "bg-[var(--forest)] text-[var(--cream)] hover:shadow-[0_18px_40px_-18px_rgba(15,31,23,0.7)]" : "bg-[var(--cream)] text-[var(--forest)] hover:shadow-[0_18px_40px_-14px_rgba(217,180,90,0.55)]");
    a.innerHTML = 'Plano Vitalício <span class="grid h-7 w-7 place-items-center rounded-full bg-[var(--gold)] text-[var(--forest)] transition-transform duration-500 group-hover:translate-y-0.5">' + ICON.arrow + "</span>";
  });

  var row = MARQUEE.concat(MARQUEE, MARQUEE, MARQUEE);
  $("#marquee").innerHTML = row.map(function (w) {
    return '<span class="font-display flex items-center gap-12 text-2xl italic text-[#f5f1e6]/80 md:text-4xl">' + w + '<span class="text-[var(--gold)]">' + ICON.spark.replace(/16/g, "14") + "</span></span>";
  }).join("");

  $("#value-list").innerHTML = VALUE_ITEMS.map(function (it, i) {
    return '<li class="group grid grid-cols-[auto_1fr] items-start gap-x-5 gap-y-1 border-b border-[#0f1f17]/[0.07] px-6 py-5 transition-colors duration-500 last:border-b-0 hover:bg-[#7a8f4f]/[0.07] sm:grid-cols-[auto_1fr_auto] sm:items-center md:px-10">' +
      '<span class="font-display text-2xl leading-none text-[#4c6b3a] transition-colors duration-500 group-hover:text-[var(--gold)]">' + String(i + 1).padStart(2, "0") + "</span>" +
      '<span class="text-[15px] leading-snug text-[var(--forest)] md:text-base">' + it[0] + "</span>" +
      '<del class="col-start-2 text-sm text-[#0f1f17]/60 sm:col-start-auto sm:text-right">' + it[1] + "</del></li>";
  }).join("");
  $("#extras").innerHTML = '<span class="text-[var(--gold)]">+ Mais conteúdos</span>' + EXTRAS.map(function (e) {
    return '<span class="flex items-center gap-3"><span class="h-1 w-1 rounded-full bg-[#d9b45a]/60"></span>' + e + "</span>";
  }).join("");

  $("#price-lines").innerHTML = PRICE_LINES.map(function (p) {
    return '<div class="flex flex-col gap-1 border-b border-white/10 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">' +
      '<span class="text-sm uppercase leading-snug tracking-[0.1em] text-[#f5f1e6]/85">' + p[0] + "</span>" +
      '<span class="shrink-0 whitespace-nowrap text-sm text-[#f5f1e6]/60"><span class="mr-1 text-[10px] uppercase tracking-widest">valor' + (p[1] ? " original" : ":") + "</span>" +
      (p[1] ? "<del>R$ " + p[1] + "</del>" : '<span class="font-semibold tracking-[0.2em] text-[var(--gold)]">BÔNUS</span>') + "</span></div>";
  }).join("");

  var li = function (icon) {
    return function (t) { return '<li class="flex gap-3 text-sm leading-relaxed text-[#f5f1e6]/90"><span class="mt-1 shrink-0 text-[var(--gold)]">' + icon + "</span>" + t + "</li>"; };
  };
  $("#includes").innerHTML = INCLUDES.map(li(ICON.check)).join("");
  $("#bonus").innerHTML = BONUS.map(li(ICON.spark)).join("");

  $("#social").innerHTML = SOCIAL.map(function (s) {
    return '<a href="' + s[0] + '" target="_blank" rel="noopener noreferrer" class="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-[background-color,border-color,transform] duration-500 hover:-translate-y-0.5 hover:border-[#d9b45a]/40 hover:bg-white/[0.06]">' +
      '<span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#d9b45a]/[0.12] text-[var(--gold)]">' + ICON[s[3]] + "</span>" +
      '<span><span class="block text-sm font-medium text-[var(--cream)]">' + s[1] + '</span><span class="block text-[11px] uppercase tracking-[0.18em] text-[#f5f1e6]/60">' + s[2] + "</span></span></a>";
  }).join("");

  /* ---------- Pássaros e folhas ---------- */
  var BIRDS = [["6%", 54, 28, 0], ["12%", 34, 34, -14], ["20%", 44, 30, -22], ["32%", 30, 36, -6], ["44%", 50, 32, -25], ["56%", 36, 35, -16], ["68%", 46, 29, -9], ["80%", 32, 38, -30], ["90%", 40, 33, -3]];
  var sky = "";
  for (var l = 0; l < 10; l++) {
    var sz = 10 + (l % 3) * 5;
    sky += '<span class="leaf-fall absolute top-0 text-[#4c6b3a] opacity-40" style="left:' + ((l * 37) % 100) + "%;animation-duration:" + (18 + (l % 4) * 5) + "s;animation-delay:" + (-l * 3.1) + 's"><svg width="' + sz + '" height="' + sz + '" viewBox="0 0 24 24" fill="currentColor"><path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15zm0 0l8-8"/></svg></span>';
  }
  BIRDS.forEach(function (b, i) {
    sky += '<div class="bird-fly absolute left-0 text-[#1d3326] opacity-40" style="top:' + b[0] + ";animation-duration:" + b[2] + "s;animation-delay:" + b[3] + 's"><div class="bird-bob" style="animation-delay:' + (i * -0.7) + 's">' +
      '<svg width="' + b[1] + '" height="' + b[1] * 0.6 + '" viewBox="0 0 50 30" fill="currentColor"><g class="bird-wing" style="animation-duration:' + (0.7 + (i % 3) * 0.15) + 's"><path d="M25 18 C18 6 8 4 0 8 C9 9 16 13 22 20 Z"/><path d="M25 18 C32 6 42 4 50 8 C41 9 34 13 28 20 Z"/></g><ellipse cx="25" cy="19" rx="4.5" ry="2.4"/></svg></div></div>';
  });
  $("#sky").innerHTML = sky;

  /* ---------- Vídeos leves (YouTube só carrega ao clicar) ---------- */
  document.querySelectorAll(".lite-yt").forEach(function (el) {
    var id = el.dataset.id, title = el.dataset.title;
    el.innerHTML = '<button type="button" class="group absolute inset-0 h-full w-full" aria-label="Reproduzir vídeo: ' + title + '">' +
      '<img src="assets/yt-' + id + '.jpg" alt="' + title + '" class="h-full w-full object-cover transition-transform duration-[1.6s] ease-out group-hover:scale-[1.03]" />' +
      '<span class="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"></span>' +
      '<span class="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/40 transition-[transform,background-color] duration-500 group-hover:scale-105 group-hover:bg-white/25">' +
      '<span class="absolute inset-0 animate-[breathe_3.2s_ease-in-out_infinite] rounded-full ring-1 ring-white/30"></span><span class="ml-1">' + ICON.play + "</span></span></button>";
    el.querySelector("button").addEventListener("click", function () {
      el.innerHTML = '<iframe class="absolute inset-0 h-full w-full" src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' + title + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    });
  });

  /* ---------- Carrosséis em loop ---------- */
  function carousel(root, images, itemClass, alt) {
    var list = images.concat(images);
    root.classList.add("relative");
    root.innerHTML = '<div class="track no-scrollbar flex gap-[14px] overflow-x-auto px-4 md:px-10">' + list.map(function (src) {
      return '<figure class="m-0 shrink-0 overflow-hidden ' + itemClass + '"><img src="' + src + '" alt="' + alt + '" loading="lazy" class="h-full w-full object-cover transition-transform duration-[1.2s] ease-out hover:scale-[1.04]" /></figure>';
    }).join("") + "</div>" +
      '<button type="button" data-dir="-1" aria-label="Anterior" class="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white ring-1 ring-white/25 backdrop-blur-md transition-[background-color,transform] duration-300 hover:scale-105 hover:bg-black/55 md:left-4">' + ICON.left + "</button>" +
      '<button type="button" data-dir="1" aria-label="Próximo" class="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white ring-1 ring-white/25 backdrop-blur-md transition-[background-color,transform] duration-300 hover:scale-105 hover:bg-black/55 md:right-4">' + ICON.right + "</button>";
    var track = root.querySelector(".track"), paused = false;
    var step = function (dir) {
      var half = track.scrollWidth / 2;
      var w = track.firstElementChild.getBoundingClientRect().width;
      if (dir > 0 && track.scrollLeft >= half - 2) track.scrollLeft -= half;
      if (dir < 0 && track.scrollLeft < w) track.scrollLeft += half;
      track.scrollBy({ left: dir * (w + 14), behavior: "smooth" });
    };
    track.addEventListener("scroll", function () {
      if (track.scrollLeft >= track.scrollWidth / 2) track.scrollLeft -= track.scrollWidth / 2;
    });
    root.querySelectorAll("button[data-dir]").forEach(function (b) {
      b.addEventListener("click", function () { step(Number(b.dataset.dir)); });
    });
    root.addEventListener("mouseenter", function () { paused = true; });
    root.addEventListener("mouseleave", function () { paused = false; });
    root.addEventListener("touchstart", function () { paused = true; }, { passive: true });
    setInterval(function () { if (!paused) step(1); }, 4200);
  }
  carousel($('[data-carousel="learn"]'), LEARN, "w-[44vw] sm:w-[220px] lg:w-[240px] aspect-[187/376] rounded-[18px] ring-1 ring-white/20", "Conteúdo da comunidade Umbanda para Todos");
  carousel($('[data-carousel="apostilas"]'), APOSTILAS, "w-[44vw] sm:w-[200px] lg:w-[220px] aspect-[243/342] rounded-[6px] shadow-[0_30px_50px_-25px_rgba(0,0,0,0.9)]", "Apostila Umbanda para Todos");

  /* ---------- Revelação ao rolar ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.1 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  /* ---------- Parallax suave do topo ---------- */
  var heroBg = $("#hero-bg"), heroVid = $("#hero-video-wrap"), hero = $("#hero");
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var p = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
      heroBg.style.transform = "translateY(" + p * 18 + "%) scale(" + (1.06 + p * 0.1) + ")";
      heroVid.style.transform = "rotateX(" + Math.min(6, p * 10) + "deg)";
      ticking = false;
    });
  }, { passive: true });

  /* ---------- Contador de 24h por visitante ---------- */
  var DAY = 864e5, DKEY = "upt_bf_deadline_v2";
  var deadline = (function () {
    var saved = Number(store.get(DKEY)), left = saved - Date.now();
    if (saved && left <= DAY) return saved;
    var d = Date.now() + DAY;
    store.set(DKEY, String(d));
    return d;
  })();
  var labels = ["horas", "min", "seg"];
  $("#countdown").innerHTML = labels.map(function (lb, i) {
    return '<div class="flex items-center gap-2 sm:gap-3"><div class="min-w-[56px] rounded-xl bg-white/[0.06] px-2 py-2 text-center ring-1 ring-white/10 sm:min-w-[64px]">' +
      '<div id="cd-' + lb + '" class="font-display text-2xl tabular-nums text-[var(--cream)] sm:text-3xl">00</div>' +
      '<div class="text-[10px] uppercase tracking-[0.25em] text-[#f5f1e6]/60">' + lb + "</div></div>" +
      (i < 2 ? '<span class="text-[#d9b45a]/60">:</span>' : "") + "</div>";
  }).join("");
  function tick() {
    var d = Math.min(DAY - 1000, Math.max(0, deadline - Date.now()));
    var v = [Math.floor(d / 36e5), Math.floor(d / 6e4) % 60, Math.floor(d / 1e3) % 60];
    labels.forEach(function (lb, i) { document.getElementById("cd-" + lb).textContent = String(v[i]).padStart(2, "0"); });
  }
  tick();
  setInterval(tick, 1000);

  /* ---------- Contador de vagas ---------- */
  var VKEY = "upt_vagas_v2";
  var state = (function () {
    try { var s = JSON.parse(store.get(VKEY)); if (s && typeof s.vagas === "number") return s; } catch (e) {}
    return { phase: 1, vagas: 150 };
  })();
  var getInfo = function () {
    var sold = state.phase === 1 ? 150 - state.vagas : state.phase === 2 ? 150 + (10 - state.vagas) : 160;
    return { phase: state.phase, remaining: state.phase === 3 ? 0 : state.vagas, sold: sold };
  };
  var MSG = {
    extra: ["Vagas esgotadas — e mais 10 liberadas", "A procura foi tão grande que a turma lotou. Para não deixar ninguém de fora, o Sacerdote Edvilson decidiu abrir 10 vagas extras."],
    closed: ["Todas as vagas foram preenchidas", "Verifique no link de compra se a oferta ainda está disponível para você — novas vagas podem ser liberadas a qualquer momento."]
  };
  var shown = state.vagas;
  function tweenTo(target) {
    var from = shown, t0 = performance.now(), dur = 1100;
    (function f(now) {
      var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      shown = from + (target - from) * e;
      $("#vagas-count").textContent = Math.round(shown);
      if (k < 1) requestAnimationFrame(f);
    })(t0);
  }
  function renderVagas() {
    var total = state.phase === 1 ? 150 : 10, pct = (state.vagas / total) * 100;
    tweenTo(state.vagas);
    $("#vagas-bar").style.width = pct + "%";
    $("#vagas-filled").textContent = (total - state.vagas) + " preenchidas";
    $("#vagas-pct").textContent = Math.round(pct) + "% disponível";
    $("#vagas-total").textContent = total + (state.phase === 1 ? " iniciais" : " extras");
    $("#vagas-label").textContent = state.phase === 1 ? "Vagas da turma" : state.phase === 2 ? "Vagas extras" : "Turma encerrada";
    $("#vagas-ping").style.display = state.phase === 3 ? "none" : "";
    $("#vagas-dot").style.backgroundColor = state.phase === 3 ? "#c2574e" : "";
    var m = state.phase === 3 ? MSG.closed : (state.phase === 2 && state.vagas === 10) || (state.phase === 1 && state.vagas === 0) ? MSG.extra : null;
    if (m) { $("#vagas-msg-title").textContent = m[0]; $("#vagas-msg-text").textContent = m[1]; }
    $("#vagas-msg").classList.toggle("show", !!m);
    store.set(VKEY, JSON.stringify(state));
  }
  function nextStep(s) {
    if (s.phase === 1) {
      if (s.vagas > 7) return [{ phase: 1, vagas: Math.max(7, s.vagas - rand(1, 3)) }, rand(1400, 2600)];
      if (s.vagas === 7) return [{ phase: 1, vagas: 0 }, rand(3500, 5000)];
      return [{ phase: 2, vagas: 10 }, 7000];
    }
    if (s.phase === 2) {
      if (s.vagas > 4) return [{ phase: 2, vagas: s.vagas - 1 }, rand(16000, 28000)];
      if (s.vagas > 1) return [{ phase: 2, vagas: s.vagas - 1 }, s.vagas === 4 ? rand(70000, 100000) : rand(35000, 50000)];
      if (s.vagas === 1) return [{ phase: 3, vagas: 0 }, rand(30000, 45000)];
    }
    return null;
  }
  function run() {
    var n = nextStep(state);
    if (!n) return;
    setTimeout(function () { state = n[0]; renderVagas(); run(); }, n[1]);
  }
  $("#vagas-count").textContent = state.vagas;
  renderVagas();
  var vio = new IntersectionObserver(function (en) {
    if (en[0].isIntersecting) { vio.disconnect(); run(); }
  }, { threshold: 0.3 });
  vio.observe($("#vagas"));

  /* ---------- Pop-ups em sincronia com o contador ---------- */
  var plural = function (k, one, many) { return k + " " + (k === 1 ? one : many); };
  var POP = [
    function () { return [ICON.eye, rand(28, 64) + " pessoas estão vendo a oferta agora"]; },
    function (c) { return c.sinceLast >= 1 && [ICON.ok, plural(c.sinceLast, "pessoa adquiriu", "pessoas adquiriram") + " a vaga vitalícia agora"]; },
    function (c) { return c.sold >= 2 && [ICON.ok, c.sold + " pessoas já garantiram a vaga vitalícia"]; },
    function (c) { return c.remaining > 1 && [ICON.users, Math.min(rand(3, 9), c.remaining) + " pessoas adquirindo a vaga vitalícia agora"]; },
    function () { return [ICON.eye, rand(118, 187) + " pessoas estão olhando essa oferta agora"]; },
    function (c) { return c.recent >= 2 && [ICON.ok, c.recent + " pessoas adquiriram nos últimos minutos"]; },
    function (c) { return c.remaining > 0 && c.remaining <= 10 && [ICON.users, "Restam apenas " + c.remaining + " vagas nesta turma"]; },
    function (c) { return c.remaining === 0 && [ICON.ok, "Turma lotada: todas as 160 vagas foram preenchidas"]; }
  ];
  var samples = [{ t: Date.now(), sold: getInfo().sold }], lastShown = getInfo().sold, count = 0;
  setInterval(function () {
    var now = Date.now();
    samples = samples.filter(function (s) { return now - s.t <= 180000; });
    samples.push({ t: now, sold: getInfo().sold });
  }, 2000);
  function showPopup() {
    var info = getInfo();
    var ctx = { sold: info.sold, remaining: info.remaining, recent: info.sold - (samples[0] ? samples[0].sold : info.sold), sinceLast: info.sold - lastShown };
    var m = null;
    for (var i = 0; i < POP.length && !m; i++) m = POP[(count + i) % POP.length](ctx);
    lastShown = info.sold;
    $("#popup-icon").innerHTML = m[0];
    $("#popup-text").textContent = m[1];
    $("#popup").classList.add("show");
    setTimeout(function () {
      $("#popup").classList.remove("show");
      count++;
      setTimeout(showPopup, rand(14000, 22000));
    }, 5200);
  }
  setTimeout(showPopup, 7000);
})();
