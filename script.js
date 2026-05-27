/*******************************************
 *  DATOS
 *******************************************/
const data = {
    students: 1200,
    satisfaction: 98,
    totalCourses: 40,
    courses: [
      { id:1, title: "React desde cero", category:"frontend", price:"149.000", duration:"8 semanas", rating:4.8, badge:"Popular", img:"linear-gradient(135deg, #1e293b, #0f172a)", description:"Aprende los fundamentos de React creando aplicaciones modernas." },
      { id:2, title: "Python para Data Science", category:"datos", price:"179.000", duration:"10 semanas", rating:4.9, badge:"Nuevo", img:"linear-gradient(135deg, #1e1b4b, #172554)", description:"Domina análisis de datos con Python." },
      { id:3, title: "Node.js y Express", category:"backend", price:"129.000", duration:"6 semanas", rating:4.7, badge:"", img:"linear-gradient(135deg, #064e3b, #022c22)", description:"Construye APIs robustas con Node.js." },
      { id:4, title: "Vue 3 Avanzado", category:"frontend", price:"139.000", duration:"7 semanas", rating:4.6, badge:"", img:"linear-gradient(135deg, #3b0764, #2e1065)", description:"Explora el composition API y Pinia." },
      { id:5, title: "Machine Learning en Python", category:"datos", price:"249.000", duration:"12 semanas", rating:4.9, badge:"Premium", img:"linear-gradient(135deg, #0c4a6e, #164e63)", description:"Algoritmos de ML con scikit-learn." },
      { id:6, title: "React Native Mobile", category:"mobile", price:"189.000", duration:"9 semanas", rating:4.5, badge:"", img:"linear-gradient(135deg, #7f1d1d, #450a0a)", description:"Crea apps móviles multiplataforma." },
      { id:7, title: "Fundamentos de DevOps", category:"backend", price:"159.000", duration:"8 semanas", rating:4.7, badge:"", img:"linear-gradient(135deg, #14532d, #052e16)", description:"CI/CD, Docker, monitoreo." },
      { id:8, title: "TypeScript Avanzado", category:"frontend", price:"119.000", duration:"5 semanas", rating:4.8, badge:"", img:"linear-gradient(135deg, #334155, #1e293b)", description:"TypeScript a nivel experto." },
      { id:9, title: "SQL y PostgreSQL", category:"datos", price:"109.000", duration:"6 semanas", rating:4.6, badge:"Básico", img:"linear-gradient(135deg, #1e3a8a, #1e40af)", description:"Bases de datos relacionales desde cero." },
      { id:10, title: "Flutter para Apps", category:"mobile", price:"199.000", duration:"10 semanas", rating:4.7, badge:"Nuevo", img:"linear-gradient(135deg, #4a044e, #3b0764)", description:"Interfaces nativas con Flutter." },
      { id:11, title: "Docker y Kubernetes", category:"backend", price:"229.000", duration:"10 semanas", rating:4.8, badge:"", img:"linear-gradient(135deg, #0f172a, #1e293b)", description:"Orquestación de contenedores." },
      { id:12, title: "Angular de 0 a experto", category:"frontend", price:"159.000", duration:"8 semanas", rating:4.5, badge:"", img:"linear-gradient(135deg, #2d1b4e, #4a044e)", description:"Angular + RxJS + NgRx." }
    ],
    testimonials: [
      { name: "Carolina López", role: "Frontend Developer en Mercado Libre", quote: "EduTrack me ayudó a pasar de soporte técnico a React en 4 meses. Las mentorías son increíbles." },
      { name: "Javier Ramírez", role: "Data Analyst en Bancolombia", quote: "Los proyectos reales marcaron la diferencia. Conseguí trabajo apenas terminé el curso de datos." },
      { name: "María Fernanda Gómez", role: "Backend Developer en Rappi", quote: "La comunidad y los mentores siempre están dispuestos a ayudar. Aprendí Node.js a un nivel profesional." },
      { name: "Andrés Suárez", role: "Mobile Developer en Tuya", quote: "Gracias a EduTrack lancé mi primera app en Flutter. 100% recomendado para perfiles junior." }
    ],
    faq: [
      { q: "¿Puedo acceder a los cursos sin conexión?", a: "Sí, una vez descargues el contenido desde la plataforma, puedes estudiar offline." },
      { q: "¿Qué métodos de pago aceptan?", a: "Aceptamos PSE, tarjetas de crédito/débito, Nequi y Bancolombia. Todo en pesos colombianos." },
      { q: "¿Los certificados tienen validez en Colombia?", a: "Sí, nuestros certificados están avalados por alianzas con empresas del sector TIC." },
      { q: "¿Puedo cancelar mi suscripción en cualquier momento?", a: "Por supuesto. No hay permanencia forzosa y puedes cancelar con un clic." },
      { q: "¿Ofrecen garantía de devolución?", a: "Sí, tienes 7 días después de la compra para solicitar reembolso si el curso no cumple tus expectativas." }
    ]
  };
  
  /*******************************************
   *  AUTENTICACIÓN
   *******************************************/
  const USERS_KEY = 'edutrack_users';
  const SESSION_KEY = 'edutrack_session';
  
  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }
  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
  function getSession() {
    return JSON.parse(sessionStorage.getItem(SESSION_KEY));
  }
  function setSession(user) {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }
  function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
  }
  
  function register(email, password) {
    const users = getUsers();
    if (users.find(u => u.email === email)) {
      return { ok: false, msg: 'Este correo ya está registrado.' };
    }
    users.push({ email, password });
    saveUsers(users);
    setSession({ email });
    return { ok: true, msg: 'Registro exitoso.' };
  }
  
  function login(email, password) {
    const users = getUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { ok: false, msg: 'Correo o contraseña incorrectos.' };
    }
    setSession({ email: user.email });
    return { ok: true, msg: 'Inicio de sesión exitoso.' };
  }
  
  function logout() {
    clearSession();
    updateAuthUI();
  }
  
  function isLoggedIn() {
    return getSession() !== null;
  }
  
  // Actualiza la UI del header según el estado de sesión
  function updateAuthUI() {
    const authContainer = document.getElementById('auth-buttons');
    const session = getSession();
    if (!authContainer) return;
  
    if (session) {
      authContainer.innerHTML = `
        <div class="user-menu">
          <span class="user-email" title="${session.email}">${session.email}</span>
          <button class="btn btn--outline btn--small" id="logout-btn">Cerrar sesión</button>
        </div>
      `;
      document.getElementById('logout-btn').addEventListener('click', logout);
      // Cambiar CTA hero a "Ir a dashboard" (o similar)
      const heroCta = document.getElementById('hero-cta');
      if (heroCta) {
        heroCta.textContent = 'Ir a mis cursos';
        heroCta.href = '#cursos';
      }
    } else {
      authContainer.innerHTML = `
        <a href="#auth-modal" class="btn btn--outline open-auth" data-action="login">Iniciar sesión</a>
        <a href="#auth-modal" class="btn btn--primary open-auth" data-action="register">Registrarse</a>
      `;
      const heroCta = document.getElementById('hero-cta');
      if (heroCta) {
        heroCta.textContent = 'Crear cuenta gratis';
        heroCta.href = '#auth-modal';
      }
      // Volver a enlazar los nuevos botones del modal
      attachModalTriggers();
    }
  }
  
  // Eventos de formularios de autenticación
  function initAuthForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value;
      const result = login(email, password);
      const msgEl = document.getElementById('login-message');
      msgEl.textContent = result.msg;
      msgEl.className = 'form-message ' + (result.ok ? 'success' : 'error');
      if (result.ok) {
        updateAuthUI();
        closeModal('auth-modal');
      }
    });
  
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('register-email').value.trim();
      const password = document.getElementById('register-password').value;
      const confirm = document.getElementById('register-confirm').value;
      const msgEl = document.getElementById('register-message');
      if (password !== confirm) {
        msgEl.textContent = 'Las contraseñas no coinciden.';
        msgEl.className = 'form-message error';
        return;
      }
      const result = register(email, password);
      msgEl.textContent = result.msg;
      msgEl.className = 'form-message ' + (result.ok ? 'success' : 'error');
      if (result.ok) {
        updateAuthUI();
        closeModal('auth-modal');
        // Actualizar contador de estudiantes
        data.students++;
        updateStatsDisplay();
        updateCTAStudentCount(data.students);
      }
    });
  }
  
  /*******************************************
   *  MODALES
   *******************************************/
  function openModal(id) {
    document.getElementById(id).classList.add('active');
  }
  function closeModal(id) {
    document.getElementById(id).classList.remove('active');
  }
  
  // Tabs del modal de autenticación
  function initModalTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const forms = {
      login: document.getElementById('login-form'),
      register: document.getElementById('register-form')
    };
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const tab = btn.dataset.tab;
        for (let key in forms) {
          forms[key].classList.toggle('active', key === tab);
        }
      });
    });
  }
  
  // Cerrar modales con botón o haciendo clic en overlay
  function initModalClose() {
    document.querySelectorAll('.modal__close, .modal__overlay').forEach(el => {
      el.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal');
        if (modal) closeModal(modal.id);
      });
    });
  }
  
  // Abrir modal de autenticación desde cualquier enlace
  function attachModalTriggers() {
    document.querySelectorAll('.open-auth').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const action = link.dataset.action || 'login';
        const authModal = document.getElementById('auth-modal');
        // Activar la pestaña correspondiente
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(b => {
          b.classList.toggle('active', b.dataset.tab === action);
        });
        document.getElementById('login-form').classList.toggle('active', action === 'login');
        document.getElementById('register-form').classList.toggle('active', action === 'register');
        openModal('auth-modal');
      });
    });
  }
  
  // Modal de detalle de curso
  function openCourseDetail(course) {
    const content = document.getElementById('course-detail-content');
    content.innerHTML = `
      <h3>${course.title}</h3>
      <p class="detail-badge">${course.badge || 'Curso'}</p>
      <p>${course.description}</p>
      <p><strong>Duración:</strong> ${course.duration}</p>
      <p><strong>Precio:</strong> $${course.price} COP</p>
      <p><strong>Valoración:</strong> ⭐ ${course.rating}</p>
      <button class="btn btn--primary close-detail">Cerrar</button>
    `;
    content.querySelector('.close-detail').addEventListener('click', () => closeModal('course-modal'));
    openModal('course-modal');
  }
  
  /*******************************************
   *  SECCIONES DINÁMICAS
   *******************************************/
  const coursesGrid = document.getElementById('courses-grid');
  const visibleCount = document.getElementById('visible-count');
  const searchInput = document.getElementById('search-input');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const testimonialsContainer = document.getElementById('testimonials-container');
  const prevBtn = document.getElementById('prev-testimonial');
  const nextBtn = document.getElementById('next-testimonial');
  const faqList = document.getElementById('faq-list');
  
  let currentFilter = 'todos';
  let testimonialIndex = 0;
  
  // Favoritos (guardados en localStorage por usuario si hay sesión)
  function getFavorites() {
    const session = getSession();
    if (!session) return [];
    return JSON.parse(localStorage.getItem(`fav_${session.email}`) || '[]');
  }
  function saveFavorites(favs) {
    const session = getSession();
    if (!session) return;
    localStorage.setItem(`fav_${session.email}`, JSON.stringify(favs));
  }
  function toggleFavorite(courseId) {
    if (!isLoggedIn()) {
      alert('Debes iniciar sesión para guardar favoritos.');
      openModal('auth-modal');
      return;
    }
    let favs = getFavorites();
    if (favs.includes(courseId)) {
      favs = favs.filter(id => id !== courseId);
    } else {
      favs.push(courseId);
    }
    saveFavorites(favs);
    renderCourses(currentFilter, searchInput.value);
  }
  
  function renderCourses(filter = 'todos', searchTerm = '') {
    let filtered = data.courses;
    if (filter !== 'todos') {
      filtered = filtered.filter(c => c.category === filter);
    }
    if (searchTerm.trim()) {
      filtered = filtered.filter(c => c.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    const favs = isLoggedIn() ? getFavorites() : [];
    coursesGrid.innerHTML = filtered.map(c => {
      const isFav = favs.includes(c.id);
      return `
      <article class="course-card" data-id="${c.id}">
        <div class="course-card__img" style="background: ${c.img}, rgba(0,0,0,0.3);">
          ${c.badge ? `<span class="course-card__badge">${c.badge}</span>` : ''}
        </div>
        <div class="course-card__body">
          <span class="course-card__category">${c.category}</span>
          <h3 class="course-card__title">${c.title}</h3>
          <div class="course-card__details">
            <span>⏱ ${c.duration}</span>
            <span>⭐ ${c.rating}</span>
          </div>
          <span class="course-card__price">$ ${c.price} COP</span>
          <button class="fav-btn ${isFav ? 'active' : ''}" data-id="${c.id}" title="Agregar a favoritos">${isFav ? '❤️' : '🤍'}</button>
        </div>
      </article>`;
    }).join('');
    visibleCount.textContent = `Mostrando ${filtered.length} de ${data.courses.length} cursos`;
  
    // Eventos de clic para abrir detalle y para favoritos
    document.querySelectorAll('.course-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Evitar abrir detalle si se hizo clic en el botón de favorito
        if (e.target.closest('.fav-btn')) return;
        const id = parseInt(card.dataset.id);
        const course = data.courses.find(c => c.id === id);
        if (course) openCourseDetail(course);
      });
    });
    document.querySelectorAll('.fav-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        toggleFavorite(id);
      });
    });
  }
  
  function renderTestimonials() {
    testimonialsContainer.innerHTML = data.testimonials.map(t => `
      <div class="testimonial-card">
        <div class="testimonial-card__user">
          <div class="testimonial-card__avatar">${t.name.charAt(0)}</div>
          <div>
            <strong>${t.name}</strong>
            <p style="color:var(--text-secondary);font-size:0.85rem">${t.role}</p>
          </div>
        </div>
        <p class="testimonial-card__text">“${t.quote}”</p>
      </div>
    `).join('');
  }
  
  function updateCarousel(index) {
    const container = testimonialsContainer;
    const cards = container.querySelectorAll('.testimonial-card');
    if (cards.length === 0) return;
    if (index < 0) index = cards.length - 1;
    if (index >= cards.length) index = 0;
    testimonialIndex = index;
    const cardWidth = cards[0].offsetWidth + 24; // 24px gap
    container.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  }
  
  // Carrusel automático (opcional, se puede desactivar con los controles)
  let autoCarousel;
  function startAutoCarousel() {
    autoCarousel = setInterval(() => {
      if (document.hidden) return;
      updateCarousel(testimonialIndex + 1);
    }, 4000);
  }
  function stopAutoCarousel() {
    clearInterval(autoCarousel);
  }
  testimonialsContainer.addEventListener('mouseenter', stopAutoCarousel);
  testimonialsContainer.addEventListener('mouseleave', startAutoCarousel);
  
  function renderFAQ() {
    faqList.innerHTML = data.faq.map((item, idx) => `
      <div class="faq-item">
        <button class="faq-question" data-index="${idx}">
          <span>${item.q}</span>
          <span class="faq-icon">+</span>
        </button>
        <div class="faq-answer">${item.a}</div>
      </div>
    `).join('');
  }
  
  /*******************************************
   *  ANIMACIÓN DE CONTADORES
   *******************************************/
  function animateCounters() {
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      document.getElementById('counter-students').textContent = Math.floor(progress * data.students).toLocaleString() + '+';
      document.getElementById('counter-courses').textContent = Math.floor(progress * data.totalCourses);
      document.getElementById('counter-satisfaction').textContent = Math.floor(progress * data.satisfaction) + '%';
      if (progress < 1) requestAnimationFrame(update);
      else {
        updateStatsDisplay();
      }
    }
    requestAnimationFrame(update);
  }
  
  function updateStatsDisplay() {
    document.getElementById('counter-students').textContent = data.students.toLocaleString() + '+';
    document.getElementById('counter-courses').textContent = data.totalCourses;
    document.getElementById('counter-satisfaction').textContent = data.satisfaction + '%';
  }
  
  function updateCTAStudentCount(count) {
    const el = document.getElementById('cta-student-count');
    if (el) el.textContent = count.toLocaleString() + '+';
  }
  
  // Observer para disparar animación de contadores
  const statsSection = document.getElementById('estadisticas');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  statsObserver.observe(statsSection);
  
  /*******************************************
   *  SCROLL REVEAL
   *******************************************/
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealElements.forEach(el => revealObserver.observe(el));
  
  /*******************************************
   *  MENÚ RESPONSIVE
   *******************************************/
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('active');
  });
  // Cerrar menú al hacer clic en un enlace (en móviles)
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) mainNav.classList.remove('active');
    });
  });
  
  /*******************************************
   *  INICIALIZACIÓN GENERAL
   *******************************************/
  function init() {
    updateAuthUI();
    initAuthForms();
    initModalTabs();
    initModalClose();
    attachModalTriggers();
    renderCourses();
    renderTestimonials();
    renderFAQ();
    updateCTAStudentCount(data.students);
  
    // Configurar eventos de cursos
    searchInput.addEventListener('input', e => renderCourses(currentFilter, e.target.value));
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.category;
        renderCourses(currentFilter, searchInput.value);
      });
    });
  
    prevBtn.addEventListener('click', () => updateCarousel(testimonialIndex - 1));
    nextBtn.addEventListener('click', () => updateCarousel(testimonialIndex + 1));
  
    // FAQ toggle
    faqList.addEventListener('click', e => {
      const question = e.target.closest('.faq-question');
      if (!question) return;
      const item = question.parentElement;
      item.classList.toggle('active');
    });
  
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#auth-modal' || href === '#course-modal') return; // manejado por modales
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });
  
    // Iniciar carrusel automático
    startAutoCarousel();
  }
  
  document.addEventListener('DOMContentLoaded', init);