class FAQController {
	private sections: Map<string, FAQSection> = new Map();
  
	constructor() {
	  this.initAllSections();
	}
  
	private initAllSections(): void {
	  document.querySelectorAll<HTMLElement>('[data-faq-section]').forEach(section => {
		const sectionId = section.dataset.faqSection;
		if (!sectionId || this.sections.has(sectionId)) return;
		
		this.sections.set(sectionId, new FAQSection(section, sectionId));
	  });
	}
  }
  
  class FAQSection {
	private readonly section: HTMLElement;
	private readonly sectionId: string;
	private isExpanded: boolean = false;
  
	constructor(section: HTMLElement, sectionId: string) {
	  this.section = section;
	  this.sectionId = sectionId;
	  this.init();
	}
  
	private init(): void {
	  this.initQuestions();
	  this.initShowMoreButton();
	}
  
	private initQuestions(): void {
	  this.section.querySelectorAll<HTMLElement>(`[data-faq-question="${this.sectionId}"]`).forEach(question => {
		question.addEventListener('click', () => this.toggleQuestion(question));
	  });
	}
  
	private initShowMoreButton(): void {
	  const showMoreBtn = this.section.querySelector<HTMLButtonElement>(`[data-faq-show-more="${this.sectionId}"]`);
	  const hiddenItems = this.section.querySelectorAll<HTMLElement>(`[data-faq-item="${this.sectionId}"].faq__item--hidden`);
  
	  if (showMoreBtn && hiddenItems.length > 0) {
		showMoreBtn.addEventListener('click', () => this.toggleShowMore(showMoreBtn, hiddenItems));
	  }
	}
  
	private toggleQuestion(question: HTMLElement): void {
	  const item = question.closest<HTMLElement>(`[data-faq-item="${this.sectionId}"]`);
	  if (!item) return;
  
	  const isActive = item.classList.contains('active');
	  const answer = item.querySelector<HTMLElement>(`[data-faq-answer="${this.sectionId}"]`);
	  const plusIcon = question.querySelector<SVGElement>('.faq__icon-plus');
	  const minusIcon = question.querySelector<SVGElement>('.faq__icon-minus');
  
	  // Close all items in this section
	  this.section.querySelectorAll<HTMLElement>(`[data-faq-item="${this.sectionId}"]`).forEach(el => {
		if (el !== item) {
		  this.closeItem(el);
		}
	  });
  
	  // Toggle current item
	  if (answer && plusIcon && minusIcon) {
		if (!isActive) {
		  this.openItem(item, answer, plusIcon, minusIcon);
		} else {
		  this.closeItem(item, answer, plusIcon, minusIcon);
		}
	  }
	}
  
	private toggleShowMore(btn: HTMLButtonElement, items: NodeListOf<HTMLElement>): void {
	  this.isExpanded = !this.isExpanded;
	  btn.classList.toggle('faq__show-more-btn--expanded', this.isExpanded);
  
	  const textSpan = btn.querySelector<HTMLElement>('.faq__show-more-text');
	  const plusIcon = btn.querySelector<SVGElement>('.faq__show-more-icon-plus');
	  const minusIcon = btn.querySelector<SVGElement>('.faq__show-more-icon-minus');
  
	  if (textSpan) {
		textSpan.textContent = this.isExpanded ? 'Показать меньше' : 'Показать еще';
	  }
  
	  if (plusIcon && minusIcon) {
		plusIcon.style.opacity = this.isExpanded ? '0' : '1';
		minusIcon.style.opacity = this.isExpanded ? '1' : '0';
	  }
  
	  items.forEach(item => {
		if (this.isExpanded) {
		  item.classList.remove('faq__item--hidden');
		} else {
		  item.classList.add('faq__item--hidden');
		  this.closeItem(item);
		}
	  });
	}
  
	private openItem(
	  item: HTMLElement,
	  answer: HTMLElement,
	  plusIcon: SVGElement,
	  minusIcon: SVGElement
	): void {
	  item.classList.add('active');
	  answer.style.maxHeight = `${answer.scrollHeight}px`;
	  plusIcon.style.opacity = '0';
	  minusIcon.style.opacity = '1';
	}
  
	private closeItem(
	  item: HTMLElement,
	  answer?: HTMLElement | null,
	  plusIcon?: SVGElement | null,
	  minusIcon?: SVGElement | null
	): void {
	  item.classList.remove('active');
	  const ans = answer || item.querySelector<HTMLElement>(`[data-faq-answer="${this.sectionId}"]`);
	  const plus = plusIcon || item.querySelector<SVGElement>('.faq__icon-plus');
	  const minus = minusIcon || item.querySelector<SVGElement>('.faq__icon-minus');
	  
	  if (ans) ans.style.maxHeight = '0';
	  if (plus) plus.style.opacity = '1';
	  if (minus) minus.style.opacity = '0';
	}
  }
  
  // Инициализация при загрузке
  export const faqAccordion = (): void => {
	new FAQController();
  };