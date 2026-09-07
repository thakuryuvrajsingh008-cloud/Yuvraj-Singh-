/* ============================================================
   YUVRAJ SINGH — VIDEO PLAYER & REEL MODAL (VIDEO-PLAYER.JS)
   Dedicated Video Showcase, Lightbox Stream Playback & Live Uploads
============================================================ */

const VIDEO_SHOWCASE_DATA = [
  {
    id: "reel-1",
    title: "Video Reel 1",
    videoUrl: "assets/videos/reel-1.mov",
    altVideoUrl: "assets/videos/my_reel.mp4/reel-1 (1).mov"
  },
  {
    id: "reel-2",
    title: "Video Reel 2",
    videoUrl: "assets/videos/reel-2.mov",
    altVideoUrl: "assets/videos/my_reel.mp4/reel-2 (1).mov"
  },
  {
    id: "reel-3",
    title: "Video Reel 3",
    videoUrl: "assets/videos/reel-3.mov",
    altVideoUrl: "assets/videos/my_reel.mp4/reel-3 (1).mov"
  }
];

class PortfolioVideoPlayer {
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
          <!-- Real Original Video Frame & Live Hover Preview -->
          <video class="reel-video-preview" preload="auto" playsinline muted loop>
            <source src="${item.videoUrl}#t=0.1" type="video/mp4">
            <source src="${item.videoUrl}#t=0.1" type="video/quicktime">
            <source src="${item.altVideoUrl}#t=0.1" type="video/quicktime">
          </video>
          
          <div class="play-button-overlay">
            <div class="play-circle">
              <i class="fa-solid fa-play" style="margin-left: 4px;"></i>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Attach hover autoplay preview to each card
    const cards = this.videoGrid.querySelectorAll('.video-reel-card');
    cards.forEach((card) => {
      const previewVideo = card.querySelector('.reel-video-preview');
      if (previewVideo) {
        card.addEventListener('mouseenter', () => {
          previewVideo.play().catch(() => {});
        });
        card.addEventListener('mouseleave', () => {
          previewVideo.pause();
          previewVideo.currentTime = 0.1;
        });
      }
    });
  }

  setupEventListeners() {
    // Open Video Lightbox on card click
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.video-reel-card');
      if (card) {
        const videoId = card.dataset.videoId;
        const videoData = VIDEO_SHOWCASE_DATA.find((v) => v.id === videoId);
        if (videoData) {
          this.openModal(videoData.videoUrl, videoData.title, '', videoData.altVideoUrl);
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
    if (!file.type.startsWith('video/') && !file.name.match(/\.(mp4|mov|webm|m4v|avi)$/i)) {
      alert('Please select a valid video file (.mp4, .mov, .webm).');
      return;
    }
    const fileUrl = URL.createObjectURL(file);
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    this.openModal(
      fileUrl,
      `Preview Reel: ${file.name}`,
      `Custom video preview loaded (${sizeMb} MB).`
    );
  }

  openModal(url, title, desc = '', altUrl = null) {
    if (!this.modal || !this.videoElement) return;

    // Set video source with multi-format fallback
    this.videoElement.innerHTML = '';
    
    const src1 = document.createElement('source');
    src1.src = url;
    src1.type = 'video/mp4';
    this.videoElement.appendChild(src1);

    const src2 = document.createElement('source');
    src2.src = url;
    src2.type = 'video/quicktime';
    this.videoElement.appendChild(src2);

    if (altUrl) {
      const src3 = document.createElement('source');
      src3.src = altUrl;
      src3.type = 'video/quicktime';
      this.videoElement.appendChild(src3);
    }

    this.videoElement.load();
    if (this.modalTitle) this.modalTitle.textContent = title;
    if (this.modalDesc) this.modalDesc.textContent = desc;

    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.videoElement.play().catch((err) => {
      console.log('Autoplay notice:', err);
    });
  }

  closeModal() {
    if (!this.modal || !this.videoElement) return;
    this.videoElement.pause();
    this.videoElement.innerHTML = '';
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PortfolioVideoPlayer();
});
