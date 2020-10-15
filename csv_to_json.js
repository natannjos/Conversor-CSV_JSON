
import csv from 'csvtojson'
import fs from 'fs'
var result = []

export function conversor (url_csv) {
	var convertidos = './arquivos_convertidos'

	if(url_csv.includes('.csv')){

		//Cria pasta de arquivos convertidos caso não exista
		if(!fs.existsSync(convertidos)){
			fs.mkdirSync(convertidos)
		}

		csv()
		.fromFile(url_csv)
		.then((jsonObj)=>{
	
				result = [JSON.stringify(jsonObj)]

				let converted_filename = url_csv.replace(/^.*[\\\/]/, '').replace('.csv', '.json')
				let full_path = `${convertidos}/${converted_filename}`
				fs.writeFile(full_path, result , err => {console.log(err)})
	
		})
		.catch(error => console.log(error.message))

	} else{
		throw new Error(`${url_csv} não é um arquivo csv`)
	}
}

export function converteDePasta(pasta) {
	try {
		var files = fs.readdirSync(pasta);

		files.forEach(file => conversor(`${pasta}/${file}`))
		
	} catch (error) {
		console.log(error)
	}
}