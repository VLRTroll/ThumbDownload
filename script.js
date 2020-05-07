/* Seleção de opções */
const resolution_options = Array.from(document.querySelector('ol').children);
const zip_option = document.getElementById('zip-option');
const all_options = resolution_options.concat(zip_option);

const selectOption = (option) => {
	all_options.forEach((element) => element.classList.remove('active'));
	option.classList.add('active');
};

all_options.forEach((option) =>
	option.addEventListener('click', () => selectOption(option))
);

/* Download de Thumbnails */

/* Callbacks do botão */
const form = document.querySelector('form');
const input = form.firstElementChild;

const link_regex = /(youtu\.be\/|youtube\.com\/watch\?v=)([\w\d]+)/;

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const link = input.value;
	if (link.length === 0) return; //texto nulo

	if (link_regex.test(link)) {
		const link_fragments = link.match(link_regex);
		const video_id = link_fragments[link_fragments.length - 1];

		console.log('Baixando thumbnails...', video_id);
	} else {
		console.error('Formato não suportado');
	}
});
