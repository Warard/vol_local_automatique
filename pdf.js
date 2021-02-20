function Fhtml(tag, method) {
    /*
    Get the content in a HTML object
    ARG :
        tag : id name or class name used to localise the html object
        method : method used to get the html object : id, or class
    RETURN :
        data : content of the html object
    */
    if (method == 'id') {
        var data = document.getElementById(tag).textContent

        return data
    }
}



function download_pdf() {
    var docDefinition = {
        content: [
            'By default paragraphs are stacked one on top of (or actually - below) another. ',
            'It\'s possible however to split any paragraph (or even the whole document) into columns.\n\n',
            'Here we go with 2 star-sized columns, with justified text and gap set to 20:\n\n\n\n\n\n',
            {
                alignment: 'justify',
                columns: [
                    {
                        text: 'Vent :' + Fhtml("wind_direction", "id") + '/' + Fhtml("wind_speed", "id") + ' kts' + '\n\n',
                        
                    },
                    {
                        text: '\n\n\n\nLorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
                    }
                ]
            },
            '\nStar-sized columns have always equal widths, so if we define 3 of those, it\'ll look like this (make sure to scroll to the next page, as we have a couple of more examples):\n\n',
            {
                columns: [
                    {
                        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
                    },
                    {
                        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
                    },
                    {
                        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Malit profecta versatur nomine ocurreret multavit, officiis viveremus aeternum superstitio suspicor alia nostram, quando nostros congressus susceperant concederetur leguntur iam, vigiliae democritea tantopere causae, atilii plerumque ipsas potitur pertineant multis rem quaeri pro, legendum didicisse credere ex maluisset per videtis. Cur discordans praetereat aliae ruinae dirigentur orestem eodem, praetermittenda divinum. Collegisti, deteriora malint loquuntur officii cotidie finitas referri doleamus ambigua acute. Adhaesiones ratione beate arbitraretur detractis perdiscere, constituant hostis polyaeno. Diu concederetur.'
                    }
                ]
            },
            '\nYou can also specify accurate widths for some (or all columns). Let\'s make the first column and the last one narrow and let the layout engine divide remaining space equally between other star-columns:\n\n',
            
            {
                columns: [
                    {
                        width: 'auto',
                        text: 'val1'
                    },
                    {
                        width: 'auto',
                        text: 'val2'
                    },
                    {
                        width: 'auto',
                        text: 'value3'
                    },
                    {
                        width: 'auto',
                        text: 'value 4'
                    },
                ]
            },
            
        ],
        styles: {
            header: {
                fontSize: 18,
                bold: true
            },
            bigger: {
                fontSize: 15,
                italics: true
            }
        },
        defaultStyle: {
            columnGap: 20
        }
        
    }
    console.log('téléchargement ...')
    pdfMake.createPdf(docDefinition).download();
}
