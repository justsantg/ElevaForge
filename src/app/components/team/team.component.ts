import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TeamMember {
  name: string;
  role: string;
  description: string;
}

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit, OnDestroy {
  @ViewChild('teamContainer') teamContainer!: ElementRef;
  
  currentSlide = 0;
  totalMembers = 0;
  membersToShow = 3;
  autoRotateInterval: any;

  teamMembers: TeamMember[] = [
    {
      name: 'Ana García',
      role: 'CEO & Fundadora',
      description: 'Líder visionaria con más de 10 años de experiencia en tecnología y gestión empresarial.'
    },
    {
      name: 'Carlos López',
      role: 'CTO',
      description: 'Arquitecto de software especializado en tecnologías emergentes y desarrollo de sistemas complejos.'
    },
    {
      name: 'María Rodríguez',
      role: 'Lead Developer',
      description: 'Desarrolladora full-stack experta en Angular, React y tecnologías de backend modernas.'
    },
    {
      name: 'David Chen',
      role: 'UX/UI Designer',
      description: 'Diseñador creativo enfocado en crear experiencias de usuario excepcionales e interfaces intuitivas.'
    },
    {
      name: 'Sophie Martin',
      role: 'DevOps Engineer',
      description: 'Especialista en automatización, CI/CD y arquitecturas cloud para optimizar los procesos de desarrollo.'
    }
  ];

  ngOnInit() {
    this.totalMembers = this.teamMembers.length;
    this.updateMembersToShow();
    this.startAutoRotate();
    this.setupIntersectionObserver();
    
    window.addEventListener('resize', () => {
      this.updateMembersToShow();
    });
  }

  ngOnDestroy() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
  }

  updateMembersToShow() {
    this.membersToShow = window.innerWidth >= 768 ? 3 : 1;
  }

  moveCarousel(direction: number) {
    this.currentSlide += direction;
    
    if (this.currentSlide < 0) {
      this.currentSlide = this.totalMembers - this.membersToShow;
    } else if (this.currentSlide > this.totalMembers - this.membersToShow) {
      this.currentSlide = 0;
    }
    
    this.updateCarouselPosition();
  }

  updateCarouselPosition() {
    if (this.teamContainer) {
      const translateX = -this.currentSlide * (100 / this.membersToShow);
      this.teamContainer.nativeElement.style.transform = `translateX(${translateX}%)`;
    }
  }

  startAutoRotate() {
    this.autoRotateInterval = setInterval(() => {
      this.moveCarousel(1);
    }, 5000);
  }

  private setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.animation = 'fadeInUp 0.8s ease forwards';
        }
      });
    }, observerOptions);

    setTimeout(() => {
      document.querySelectorAll('.team-member').forEach(el => {
        observer.observe(el);
      });
    }, 100);
  }
}