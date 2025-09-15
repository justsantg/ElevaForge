import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  services: Service[] = [
    {
      icon: 'fas fa-code',
      title: 'Desarrollo Web',
      description: 'Creamos aplicaciones web modernas, responsivas y optimizadas para el mejor rendimiento y experiencia de usuario.'
    },
    {
      icon: 'fas fa-mobile-alt',
      title: 'Apps Móviles',
      description: 'Desarrollamos aplicaciones móviles nativas e híbridas para iOS y Android con interfaces intuitivas.'
    },
    {
      icon: 'fas fa-cloud',
      title: 'Soluciones Cloud',
      description: 'Implementamos arquitecturas en la nube escalables y seguras para optimizar tus recursos tecnológicos.'
    },
    {
      icon: 'fas fa-database',
      title: 'Gestión de Datos',
      description: 'Diseñamos y optimizamos bases de datos para mejorar el rendimiento y la integridad de tu información.'
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Ciberseguridad',
      description: 'Protegemos tus sistemas con las mejores prácticas de seguridad y auditorías especializadas.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Analytics & BI',
      description: 'Transformamos tus datos en insights valiosos con herramientas de análisis y business intelligence.'
    }
  ];

  ngOnInit() {
    this.setupIntersectionObserver();
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
      document.querySelectorAll('.service-card').forEach(el => {
        observer.observe(el);
      });
    }, 100);
  }
}