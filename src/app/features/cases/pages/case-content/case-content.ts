import { AfterViewInit, Component, input, signal } from '@angular/core';
import { CaseResponseDto } from '../../dto/case-response.dto';
import { createIcons, icons } from 'lucide';
import { CaseContentMode } from '../../models/case.content.model';
import { CaseSectionKey } from '../../models/case-section-key.model';

@Component({
  selector: 'app-case-content',
  imports: [],
  templateUrl: './case-content.html',
  styleUrl: './case-content.scss',
})
export class CaseContent {
  readonly case = input.required<CaseResponseDto>();
  readonly mode = input<CaseContentMode>('full');

  readonly patientOpen = signal(true);
  readonly vitalsOpen = signal(true);
  readonly neurologicalOpen = signal(false);
  readonly findingsOpen = signal(false);

  toggleSection(section: CaseSectionKey): void {
    switch (section) {
      case 'patient':
        this.patientOpen.update((open) => !open);
        break;

      case 'vitals':
        this.vitalsOpen.update((open) => !open);
        break;

      case 'neurological':
        this.neurologicalOpen.update((open) => !open);
        break;

      case 'findings':
        this.findingsOpen.update((open) => !open);
        break;
    }
  }

  expandAll(): void {
    this.patientOpen.set(true);
    this.vitalsOpen.set(true);
    this.neurologicalOpen.set(true);
    this.findingsOpen.set(true);
  }

  collapseAll(): void {
    this.patientOpen.set(false);
    this.vitalsOpen.set(false);
    this.neurologicalOpen.set(false);
    this.findingsOpen.set(false);
  }
}
