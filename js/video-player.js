/* ============================================================
   AURORA STUDIOS — VIDEO PLAYER & REEL MODAL (VIDEO-PLAYER.JS)
   Handles Video Lightbox, Sample Stream Playback & Local Uploads
============================================================ */

const VIDEO_SHOWCASE_DATA = [
  {
    id: "reel-1",
    title: "Cinematic Video Edit & Commercial Reel #1",
    category: "Commercial & Video Editing",
    duration: "0:45",
    views: "520K+",
    poster: "assets/images/waffle_paradise_mockup.jpg",
    videoUrl: "assets/videos/reel-1.mov",
    fallbackUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description: "High-impact video editing with dynamic motion graphics, sound design, rhythmic cuts, and high retention pacing."
  },
  {
    id: "reel-2",
    title: "Viral Hook Reel & Story Edit #2",
    category: "Social Media & UGC Reel",
    duration: "0:30",
    views: "480K+",
    poster: "assets/images/ace_factor_mockup.jpg",
    videoUrl: "assets/videos/reel-2.mov",
    fallbackUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description: "Short-form video edit engineered with thumb-stopping 3-second hook, speed ramps, and engaging kinetic captions."
  },
  {
    id: "reel-3",
    title: "Brand Film & Visual Showcase #3",
    category: "Brand Film & Motion",
    duration: "0:40",
    views: "360K+",
    poster: "assets/images/fitless2fitness_mockup.jpg",
    videoUrl: "assets/videos/reel-3.mov",
    fallbackUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    description: "Cinematic visual montage with color grading, transitions, audio mastering, and direct-response framing."
  }
];

class AuroraVideoPlayer {
  constructor() {
    this.modal = document.getElementById('videoModal');
    this.videoElement = document.getElementById('modalVideoPlayer');
    this.modalTitle = document.getElementById('videoModalTitle');
    this.modalDesc = document.getElementById('videoModalDesc');
    this.closeBtn = document.getElementById('btnCloseVideoModal');
    this.videoGrid = document.getElementById('videoShowcaseGrid');
    this.dropZone = document.getElementById('videoDropZone');
    this.fileInput = document.getElementById('customVideoInput');

    this.init();
  }

  init() {
    this.renderVideoCards();
    this.setupEventListeners();
  }

  renderVideoCards() {
    if (!this.videoGrid) return;
    this.videoGrid.innerHTML = VIDEO_SHOWCASE_DATA.map((item) => `
      <div class="video-reel-card reveal" data-video-id="${item.id}">
        <div class="reel-thumbnail-box">
          <img src="${item.poster}" alt="${item.title}" class="reel-thumbnail-img">
          <div class="play-button-overlay">
            <div class="play-circle">
              <i class="fa-solid fa-play" style="margin-left: 4px;"></i>
            </div>
          </div>
          <div style="position: absolute; bottom: 16px; left: 16px; right: 16px; display: flex; justify-content: space-between; align-items: center; z-index: 2;">
            <span style="background: rgba(0,0,0,0.75); backdrop-filter: blur(6px); border: 1px solid rgba(255,255,255,0.15); padding: 4px 10px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.75rem; color: #fff;">
              <i class="fa-solid fa-eye" style="color: var(--accent-cyan); margin-right: 4px;"></i> ${item.views}
            </span>
            <span style="background: var(--bg-dark); padding: 4px 10px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.75rem; color: #cbd5e1;">
              ${item.duration}
            </span>
          </div>
        </div>
        <div style="padding: 22px;">
          <span style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.75rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.05em;">
            ${item.category}
          </span>
          <h4 style="font-size: 1.15rem; margin: 8px 0 6px; color: #fff;">
            ${item.title}
          </h4>
          <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.55;">
            ${item.description}
          </p>
        </div>
      </div>
    `).join('');
  }

  setupEventListeners() {
    // Open Video Lightbox on card click
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.video-reel-card');
      if (card) {
        const videoId = card.dataset.videoId;
        const videoData = VIDEO_SHOWCASE_DATA.find((v) => v.id === videoId);
        if (videoData) {
          this.openModal(videoData.videoUrl, videoData.title, videoData.description, videoData.fallbackUrl);
        }
      }
    });

    // Close Modal
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });

    // Custom Video File Drop / Upload
    if (this.dropZone && this.fileInput) {
      this.dropZone.addEventListener('click', () => this.fileInput.click());

      this.dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        this.dropZone.classList.add('dragover');
      });

      this.dropZone.addEventListener('dragleave', () => {
        this.dropZone.classList.remove('dragover');
      });

      this.dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        this.dropZone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          this.handleCustomVideoFile(e.dataTransfer.files[0]);
        }
      });

      this.fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          this.handleCustomVideoFile(e.target.files[0]);
        }
      });
    }
  }

  handleCustomVideoFile(file) {
    if (!file.type.startsWith('video/')) {
      alert('Please select a valid video file (.mp4, .webm, .mov).');
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    this.openModal(fileUrl, `Uploaded Reel: ${file.name}`, `Custom preview loaded for ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB). Ready to embed permanently!`);
  }

  openModal(url, title, desc, fallbackUrl = null) {
    if (!this.modal || !this.videoElement) return;
    this.videoElement.onerror = () => {
      if (fallbackUrl && this.videoElement.src !== fallbackUrl) {
        this.videoElement.src = fallbackUrl;
        this.videoElement.play().catch(() => {});
      }
    };
    this.videoElement.src = url;
    if (this.modalTitle) this.modalTitle.textContent = title;
    if (this.modalDesc) this.modalDesc.textContent = desc;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.videoElement.play().catch(() => {});
  }

  closeModal() {
    if (!this.modal || !this.videoElement) return;
    this.videoElement.pause();
    this.videoElement.src = '';
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AuroraVideoPlayer();
});
