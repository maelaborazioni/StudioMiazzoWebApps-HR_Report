/**
 * @properties={typeid:24,uuid:"25AA5A72-0381-4AF9-8C29-F88CCBFA0C2D"}
 */
function openControlloAssociazioni(event)
{
	var _form = forms.hrr_controlloassociazioni.controller.getName();
	var _jsForm = solutionModel.getForm(_form);
	
	var _window = application.createWindow('esporta_dettaglio_scopo_w',JSWindow.MODAL_DIALOG);
	_window.setInitialBounds(-1,-1,_jsForm.width,_jsForm.getBodyPart().height);
	_window.resizable = true;
	_window.title = 'Dettaglio scopo';
	_window.show(forms[_form]);
}

/**
 * @properties={typeid:24,uuid:"3D1EEF4A-162A-472B-8D5C-E662E8773D14"}
 */
function openEsportaDatiAnagrafici(event)
{
	var _form = forms.hrr_datidipendenti.controller.getName()
	globals.ma_utl_showFormInDialog(_form, 'Esporta anagrafica dipendenti');
}

/**
 * @properties={typeid:24,uuid:"40E3CEE9-E24D-454D-AE70-F8C01191C486"}
 */
function openEsportaDettaglioRetributivo(event)
{
	var _form = forms.hrr_dettaglioretributivo.controller.getName()
	globals.ma_utl_showFormInDialog(_form, 'Esporta dettaglio retributivo');
}

/**
 * @properties={typeid:24,uuid:"9C207C20-E387-4F42-B3EF-0152B0DAE97D"}
 */
function esportaPrivacy()
{
	esportaPrivacySicurezza('HR_Privacy.jasper', 'Privacy', globals.OpType.SDP);
}

/**
 * @properties={typeid:24,uuid:"66B1DCA1-9470-4516-9403-B268B6538CD1"}
 */
function esportaSicurezza()
{
	esportaPrivacySicurezza('HR_Sicurezza.jasper', 'Sicurezza', globals.OpType.SDS);
}

/**
 * @properties={typeid:24,uuid:"B688E70B-4745-4E81-9CE4-1DD54E8F9996"}
 * @AllowToRunInFind
 */
function esportaPrivacySicurezza(report, reportName, opType)
{
	try
	{
		var employer = globals.ma_utl_showLkpWindow
		(
			{
				lookup: 'AG_Lkp_Ditta', 
				allowInBrowse: true
			}
		);

		if(employer)
		{
			/** @type {JSFoundSet<db:/ma_anagrafiche/ditte>} */
			var dittaFs = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE, globals.Table.DITTE);
			if(dittaFs && dittaFs.find())
			{
				dittaFs.idditta = employer;
				dittaFs.search();
			}
			
			var parameters =
			{
				pidditta:			dittaFs.idditta
			};
				     
			var operation = globals.startAsyncOperation
			(
				 globals.createReport
				,[
					 globals.Server.MA_HR
					,parameters
					,report
					,[[reportName, dittaFs.ragionesociale].join('_'),'pdf'].join('.')
				 ]
				,null
				,700
				,opType
			);
			
			/**
			 * Save additional operation's information
			 */
			operation.op_hash = application.getUUID();	// Prevents other users to block the report
			operation.op_ditta = employer;
			operation.op_message = operation.operationlog_to_operationtype.descrizione;
		}
	}
	catch(ex)
	{
		application.output(ex, LOGGINGLEVEL.ERROR);
	}
}

/**
 * @param {Number} employerID
 * @param {String} employerName
 * @param {Date} dateFrom
 * @param {Date} dateTo
 * @param {Number} scopoID
 * @param {Array} employeesToExport
 * @param {String} fieldsToExport
 * @param {Array} riclassificazioni
 * @param {JSRecord<db:/ma_log/operationlog>} operation
 *
 * @properties={typeid:24,uuid:"2334930A-E9E2-4D59-A370-ACB68BC1FA1F"}
 * @AllowToRunInFind
 */
function createExcel(employerID, employerName, dateFrom, dateTo, scopoID, employeesToExport, fieldsToExport, riclassificazioni, operation)
{
	try
	{
		databaseManager.startTransaction();
		
		/** @type {JSDataSet}*/
		var dataset = globals.getDettaglioRetributivo
			(
				 employerID
				,dateFrom
				,dateTo
				,scopoID
				,employeesToExport
				,fieldsToExport
				,riclassificazioni
			);
			
		if(!dataset.getMaxRowIndex() > 0)
			throw 'Errore durante il recupero dei dati';

		/**
		 * Update the operation's progress
		 */
		operation.op_progress = 50;
		
		var fileName = "Dettaglio_Retributivo_" + employerName + '.xls';
		var template = plugins.file.readFile('C:/Report/dettaglio_retributivo.xls');
		/**  @type {Array<String>} */
		var arrFte = fieldsToExport.split(',').map(function(item){ return item.toLowerCase(); })
		
		/** @type{Array<byte>} */
		var output = globals.xls_export
			(
				 dataset
				,null
				,false
				,false
				,false
				,null
				,'Dettaglio Retributivo'
				,template
				,arrFte
			);
			
		if(!output)
			throw 'Errore durante la creazione del file';
		
		/**
		 * Save the generated print
		 */
		if(!saveFile(operation, output, fileName, globals.MimeTypes.EXCEL))
			throw 'Errore durante il salvataggio del file';
		
		operation.op_message = 'Esportazione completata con successo';
		operation.op_end = new Date();
		operation.op_status = globals.OpStatus.SUCCESS;
		operation.op_progress = 100;
		
		return true;
	}
	catch(ex)
	{
		application.output(ex, LOGGINGLEVEL.ERROR);
		
		if(operation)
		{
			operation.op_end = new Date();
			operation.op_status = globals.OpStatus.ERROR;
			operation.op_message = 'Errore durante l\'esportazione dei dati';
		}

		return false;
	}
	finally
	{
		// Whatever happened, clear the data source for later use
		if(dataset)
			dataset.removeRow(-1);
		
		databaseManager.commitTransaction();
	}
}

/**
 * @param {String} fileUri
 * @param {String} fileName
 * @param {JSRecord<db:/ma_log/operationlog>} operation
 *
 * @properties={typeid:24,uuid:"2F04FBF7-3FBD-4A9D-8FFC-B5EB752F3698"}
 */
function createZipFile(fileUri, fileName, operation)
{
	// TODO da rivedere (se necessario...)
	
//	try
//	{
//		var jsFile = plugins.file.convertToJSFile(fileUri);
//		
//		var filePath = jsFile.getAbsolutePath();
//		var lastChar = filePath.charAt(filePath.length - 1);
//		if( lastChar != '\\' && lastChar != '/' )
//		{
//			filePath = filePath + '\\';
//		}
//		
//		var zipFile = plugins.it2be_tools.zip(filePath, true);
//		if(zipFile)
//		{			
//			var fileBytes = plugins.file.readFile(zipFile);
//			if(fileBytes)
//			{
//				/**
//				 * Save the generated print
//				 */
//				saveFile(operation, fileBytes, fileName, globals.MimeTypes.ZIP);
//				
//				operation.op_message = 'Esportazione completata con successo';
//				operation.op_end = new Date();
//				operation.op_status = globals.OpStatus.SUCCESS;
//				operation.op_progress = 100;
//			}
//		}
//		
//		if(!plugins.file.deleteFile(zipFile))
//		{
//			application.output('Error deleting file ' + zipFile, LOGGINGLEVEL.WARNING);
//		}
//		
//		return true;
//	}
//	catch(ex)
//	{
//		application.output(ex, LOGGINGLEVEL.ERROR);
//		
//		if(operation)
//		{
//			operation.op_end = new Date();
//			operation.op_status = globals.OpStatus.ERROR;
//			operation.op_message = 'Errore durante l\'esportazione dei dati';
//		}
//		
//		return false;
//	}
}
