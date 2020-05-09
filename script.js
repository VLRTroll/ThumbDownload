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
const CORS_BASE_URL = 'https://cors-anywhere.herokuapp.com';

const thumbnail_links = [
	(id) => `https://img.youtube.com/vi/${id}/default.jpg`,
	(id) => `https://img.youtube.com/vi/${id}/sddefault.jpg`,
	(id) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
	(id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
	(id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
];

const thumbnail_links = [
	(id) => `https://img.youtube.com/vi/${id}/default.jpg`,
	(id) => `https://img.youtube.com/vi/${id}/sddefault.jpg`,
	(id) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
	(id) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
	(id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
];

const preview_thumbnail_links = [
	(id) => `https://img.youtube.com/vi/${id}/1.jpg`,
	(id) => `https://img.youtube.com/vi/${id}/2.jpg`,
	(id) => `https://img.youtube.com/vi/${id}/3.jpg`,
];

const downloadThumbnail = async (link) => {
	const headers = new Headers();
	headers.append('Access-Control-Allow-Origin', '*');
	headers.append('Content-Type', 'image/jpeg');

	const response = await fetch(CORS_BASE_URL + '/' + link);
	const blob = await response.blob();
	saveAs(blob, 'thumbnail680x480.jpg');
};

const downloadThumbnailZip = async (video_id) => {
	const Zip = new JSZip();
	const folder = zip.folder('VideoThumbnails');
	const preview_folder = folder.folder('PreviewThumbnails');

	const thumbnails = await Promise.allSettled(
		thumbnail_links.map((link) => downloadThumbnail(link(video_id)))
	).then((responses) => responses.blob());

	console.log(thumbnails);

	// const preview_thumbnails = await Promise.allSettled(
	// 	preview_thumbnail_links.map((link) => downloadThumbnail(link(video_id)))
	// );
	// Zip.file('idlist.txt', `PMID:29651880\r\nPMID:29303721`);
	// folder.file('idlist.txt', `PMID:29651880\r\nPMID:29303721`);
	// Zip.generateAsync({ type: 'blob' }).then((content) =>
	// 	saveAs(content, 'download.zip')
	// );
};

/* Callbacks do botão */
const form = document.querySelector('form');
const input = form.firstElementChild;

const link_regex = /(youtu\.be\/|youtube\.com\/watch\?v=)([&\?]+)/;

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const link = input.value;
	if (link.length === 0) return; //texto nulo

	if (link_regex.test(link)) {
		const link_fragments = link.match(link_regex);
		const video_id = link_fragments[link_fragments.length - 1];

		/* Preenche imagem no HTML */
		const imagem = document.querySelector('img');
		imagem.src = thumbnail_links.slice(-1)[0](video_id);
		imagem.alt = 'Thumbnail Preview';

		// const link = thumbnail_links[0](video_id);
		downloadThumbnailZip(video_id);
	} else {
		console.error('Formato não suportado');
	}
});
