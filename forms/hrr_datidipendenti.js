/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"8A831D44-7994-4274-AF91-2261A94EB559"}
 */
var lkpDitta = 'AG_Lkp_Ditta';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AF22C1DB-979D-40B1-AA7B-0DAEB99DF389"}
 */
var lkpLavoratori = 'AG_Lkp_Lavoratori';

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"E553E6A0-4F73-46C7-9E25-F1BDBDF05E0A",variableType:93}
 */
var vDateTo = new Date();

/**
 * @type {Array}
 * @properties={typeid:35,uuid:"74BA80D5-5177-4EDD-8F0B-E7EBB81E45E7",variableType:-4}
 */
var vEmployeesIDs = null;

/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"620B3BB0-AB16-4C77-8A54-370E3F043D5F"}
 */
var vEmployeesNames = null;

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"11810C63-F2BA-404C-874B-CF337B36D077",variableType:8}
 */
var vEmployerCode = null;

/**
 * @properties={typeid:35,uuid:"7D254374-BEEC-4920-A6A2-225FA8196A74",variableType:-4}
 */
var vEmployerID = null;

/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"7684D642-C92C-49AA-A53A-05402575E3F3"}
 */
var vEmployerName = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"52EF7CDA-9360-457C-9235-8EEEDEC13F51",variableType:4}
 */
var vExportClassificationsData = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"40274F55-B956-43D3-841D-463EEB69A407",variableType:4}
 */
var vExportContactsData = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"FD6126CC-C94E-4455-804A-3EEA78BBBAAC",variableType:4}
 */
var vExportContractData = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"C0E859EB-D15C-4641-82CE-7E51E0019608",variableType:4}
 */
var vExportDocumentsData = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"6E90E57F-BDF0-4231-882E-482DF1A83468",variableType:4}
 */
var vExportInailData = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"94E8725E-D016-4046-B5EC-2A809998B0DA",variableType:4}
 */
var vExportOtherPersonalData = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"A80B7890-951B-4889-9D2D-B96823B51603",variableType:4}
 */
var vExportPersonalData = 1;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"304BFA91-7CA0-4FCB-A9A5-65C0DA815419",variableType:4}
 */
var vFormat = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"6DB68845-B0E2-4532-8CDA-F5C717E7A4FB",variableType:4}
 */
var vIncludeStoppedEmployees = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0B8649DA-104B-4286-AB30-1DC8C6C15911",variableType:4}
 */
var vPrintSummary = 0;

/**
 * @param {Boolean} _firstShow
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"64A745E6-B19B-4FE9-B476-AB664C1F5DB5"}
 */
function onShowForm(_firstShow, _event)
{
	controller.readOnly = false;
//	resetAll();
	
	vDateTo = globals.TODAY;
}

/**
 * @param {JSRecord} rec
 *
 * @properties={typeid:24,uuid:"C1E28D69-6733-4582-A0F2-605FF26F9DE5"}
 */
function updateEmployer(rec)
{
	if(rec)
	{
		// Clear any previous information
		vEmployeesIDs = null;
		vEmployeesNames = null;
		
		// Clear the foundsets of employees and scopiriclassificazioni
		forms[elements.dipendenti_tabless.getTabFormNameAt(1)].foundset.clear();
			
		vEmployerName = rec['ragionesociale'];
		vEmployerCode = rec['codice'];
		vEmployerID = rec['idditta'];
		
		elements.employee_btn_search.enabled = true;
		elements.select_all_employees_btn.enabled = true;
	}
}

/**
 * @param {Array<JSRecord>} records
 *
 * @properties={typeid:24,uuid:"887A7EBD-803F-42D8-9563-596AF65E1F6A"}
 * @AllowToRunInFind
 */
function updateMultipleEmployees(records)
{
	if(records.length > 0)
	{
//		vEmployeesNames = globals.objectsToArray(records,'lavoratori_to_persone.nominativo').join(', ')
		
		/** @type {Number} */
		var _currTabIdx = elements.dipendenti_tabless.tabIndex
		var _formObj = forms[elements.dipendenti_tabless.getTabFormNameAt(_currTabIdx)]
		
		/** @type {JSFoundset<db:/ma_anagrafiche/lavoratori>} */
		var _employeesFs = _formObj.foundset;
		if(_employeesFs.find())
		{
//			if(globals.isCliente())
//				_employeesFs.lavoratori_cliente_to_lavoratori.idlavoratoresede = vEmployeesIDs;
//			else
				_employeesFs.idlavoratore = vEmployeesIDs;
				
			_employeesFs.search()
		}
		
//		/** @type {Number} */
//		var _currTabIdx = elements.dipendenti_tabless.tabIndex
//		var _formObj = forms[elements.dipendenti_tabless.getTabFormNameAt(_currTabIdx)]
//		_formObj.controller.loadRecords(_employeesFs)
		_formObj.controller.sort(solutionModel.getForm(_formObj.controller.getName()).initialSort)
	}
}

/**
 * @param {JSRecord} record
 *
 * @properties={typeid:24,uuid:"DDBAB055-E1FD-43C9-978A-8AC8DB118700"}
 */
function updateEmployee(record)
{
	updateMultipleEmployees([record]);
}

/**
 * @param {JSFoundset} _foundset
 *
 * @properties={typeid:24,uuid:"DEB11747-0728-4A55-8D66-339AABA697D2"}
 * @AllowToRunInFind
 */
function filterEmployees(_foundset)
{
	if(vEmployerID)
	{
		/**
		 * Use the converted company's ID instead of the customer's
		 */
		/** @type {JSFoundset<db:/ma_anagrafiche/v_ditte_cliente2sede>} */
	 	_foundset.addFoundSetFilterParam('idditta','=', vEmployerID, 'employeesFilter');
		_foundset.addFoundSetFilterParam('assunzione','^||<=',vDateTo || globals.TODAY,'hiredEmployeesFilter')
		if(!vIncludeStoppedEmployees)
			_foundset.addFoundSetFilterParam('cessazione','^||>=',vDateTo || globals.TODAY,'employeesStoppedFilter');
	}
	
	return _foundset;
}

/**
 * @properties={typeid:24,uuid:"2BA53198-6302-4935-AB41-167F9FECB048"}
 */
function resetAll()
{
	var _jsForm = solutionModel.getForm(controller.getName());
	var _formVars = _jsForm.getVariables();
	for(var _var = 0; _var < _formVars.length; _var++)
	{
		if(globals.startsWith('v', _formVars[_var].name))
		{
			var resetValue;
			switch(_formVars[_var].variableType)
			{
				default:
					resetValue = null;
			}
			
			forms[controller.getName()][_formVars[_var].name] = resetValue;
		}
	}
	
	var _formPanels = _jsForm.getTabPanels();
	for(var _panel = 0; _panel < _formPanels.length; _panel++)
	{
		var _tabs = _formPanels[_panel].getTabs();
		for(var _tab in _tabs)
			forms[_tabs[_tab].containsForm.name].foundset.clear();
	}
}

/**
 * @param {JSEvent} event
 * 
 * @private
 *
 * @properties={typeid:24,uuid:"B21856F4-C316-4D2E-9472-9FB7667B8270"}
 */
function exportExcel(event) 
{
	try
	{
		if(!(vExportClassificationsData || vExportContactsData || vExportContractData || vExportDocumentsData || vExportInailData || vExportOtherPersonalData || vExportPersonalData))
		{
			globals.ma_utl_showWarningDialog('Selezionare almeno un\'opzione','i18n:hr.msg.attention')
			return
		}
		
		if(vEmployerID && vDateTo)
		{
			globals.svy_mod_closeForm(event);
			
			var operation = globals.startAsyncOperation
			(
				 createExcelFile,
				 [vEmployeesIDs, vDateTo, vEmployeesIDs || null],
				 null,
				 null,
				 globals.OpType.EDA
			);
			
			/**
			 * Save additional operation's info
			 */
			operation.op_hash = utils.stringMD5HashBase64(vEmployerID + vDateTo.toString());
			operation.op_ditta = vEmployerID;
			operation.op_message = operation.operationlog_to_operationtype.descrizione + ' ' + utils.dateFormat(vDateTo,globals.EU_DATEFORMAT);
			operation.op_periodo = utils.dateFormat(vDateTo, globals.PERIODO_DATEFORMAT);
		}
		else
		{
			globals.ma_utl_showWarningDialog('Impostare una data ed una ditta','i18n:hr.msg.attention');
			return
		}
	}
	catch(ex)
	{
		application.output(ex,LOGGINGLEVEL.ERROR);
	}
}

/**
 * @properties={typeid:24,uuid:"27572D3F-6800-4C47-BC45-80E1BA8F3E2B"}
 * @AllowToRunInFind
 */
function createExcelFile(employerID, dateTo, employeesToExport, operation)
{
	try
	{
		/**
		 * Make sure some date is set
		 */
		vDateTo = vDateTo || globals.TODAY;
		
		var fileName = ['Dati_Anagrafici', vEmployerName, utils.dateFormat(vDateTo, globals.PERIODO_DATEFORMAT)].join('_') + '.xls';
		var localFile = true;
		/** @type {Array<byte>} */
		var output = [];
		var result = [];
		
		var template = plugins.file.readFile(scopes.utl.REPORT_DIR + 'dati_anagrafici.xls');
		
		if(vExportPersonalData)
		{
			result = globals.exportPersonalData(localFile, vEmployerID, vDateTo, employeesToExport, fileName, template);
			output = (result.length > 0 && result) || output;
		}
		
		if(vExportOtherPersonalData)
		{
			result = globals.exportOtherPersonalData(localFile, vEmployerID, vDateTo, employeesToExport, fileName, output || template);
			output = (result.length > 0 && result) || output;
		}
		
		if(vExportContactsData && output)
		{
			result = globals.exportContactsData(localFile, vEmployerID, vDateTo, employeesToExport, fileName, output || template);
			output = (result.length > 0 && result) || output;
		}
		
		if(vExportInailData && output)
		{
			result = globals.exportInailData(localFile, vEmployerID, vDateTo, employeesToExport, fileName, output || template);
			output = (result.length > 0 && result) || output;
		}
		
		if(vExportContractData && output)
		{
			result = globals.exportContractData(localFile, vEmployerID, vDateTo, employeesToExport, fileName, output || template);
			output = (result.length > 0 && result) || output;
		}
	
		if(vExportClassificationsData && output)
		{
			result = globals.exportClassificationsData(localFile, vEmployerID, vDateTo, employeesToExport, fileName, output || template);
			output = (result.length > 0 && result) || output;
		}
		
		if(vExportDocumentsData && output)
		{
			result = globals.exportDocumentsData(localFile, vEmployerID, vDateTo, employeesToExport, fileName, output || template);
			output = (result.length > 0 && result) || output;
		}
		
		if(!output)
			return false;
		
		databaseManager.startTransaction();
		
		if(!globals.saveFile(operation, output, fileName, globals.MimeTypes.EXCEL))
			throw 'Errore durante il salvataggio del file';
		
		operation.op_message = 'Esportazione completata con successo';
		operation.op_end = new Date();
		operation.op_status = globals.OpStatus.SUCCESS;
		operation.op_progress = 100;
		
		plugins.file.writeFile(fileName, output);
		
		return true;
	}
	catch(ex)
	{
		application.output(ex, LOGGINGLEVEL.ERROR);
		
		if(operation)
		{
			operation.op_end = new Date();
			operation.op_status = globals.OpStatus.ERROR;
			operation.op_message = 'Errore durante l\'esportazione dei dati' + (ex && (': ' + ex));
		}
		
		return false;
	}
	finally
	{
		/**
		 * Remove all created files and commit the transaction
		 */
		plugins.file.deleteFolder(globals.SERVER_TMPDIR.replace(/\\/g,'/') + '/export/', false);
		databaseManager.commitTransaction();
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7757EEF7-5156-4FC9-95EC-E2CC678C69F3"}
 */
function setExportAll(event) {
	var _exportVars = solutionModel.getForm(controller.getName()).getVariables(true);
	for(var v in _exportVars)
	{
		if(_exportVars[v].variableType == JSVariable.INTEGER && globals.startsWith('vExport', _exportVars[v].name, true))
			forms[controller.getName()][_exportVars[v].name] = 1;
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"BA15ADC5-5168-4AD9-8E48-69BE53F9F3FA"}
 */
function setExportNone(event) {
	var _exportVars = solutionModel.getForm(controller.getName()).getVariables(true);
	for(var v in _exportVars)
	{
		if(_exportVars[v].variableType == JSVariable.INTEGER && _exportVars[v].name != 'vIncludeStoppedEmployees')
			forms[controller.getName()][_exportVars[v].name] = 0;
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7C307017-454E-447B-8BD3-4E053012F112"}
 * @AllowToRunInFind
 */
function selectAllEmployees(event) 
{
	/** @type {JSFoundset<db:/ma_anagrafiche/lavoratori>} */
	var _employeesFs = forms[elements.dipendenti_tabless.getTabFormNameAt(1)].foundset
	_employeesFs.clear();
	
	if(_employeesFs.find())
	{
		_employeesFs.idditta = vEmployerID;
			
		_employeesFs.assunzione = '<=' + globals.formatForFind(vDateTo || globals.TODAY);
		if(!vIncludeStoppedEmployees)
			_employeesFs.cessazione = '^||>=' + globals.formatForFind(vDateTo || globals.TODAY);
		
		_employeesFs.search();
		_employeesFs.sort('lavoratori_to_persone.nominativo asc');
	}
	
	vEmployeesIDs = globals.foundsetToArray(_employeesFs, 'idlavoratore');
	
	elements.select_none_employee_btn.enabled = true;
	elements[event.getElementName()].enabled  = false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A297A4D5-AAB4-4DB4-BAEE-79DD9E1156EB"}
 */
function deselectAllEmployees(event) {
	vEmployeesIDs = []
	forms[elements.dipendenti_tabless.getTabFormNameAt(1)].foundset.clear()
	
	globals.clearLookup('AG_Lkp_Lavoratori');
	
	vEmployeesIDs = null;
	
	elements.select_all_employees_btn.enabled = true;
	elements[event.getElementName()].enabled  = false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"BAB396A3-87EB-4F5B-879E-7EC057BE73CD"}
 * @AllowToRunInFind
 */
function exportReport(event) 
{
	try
	{		
		if(vEmployerID && checkExport())
		{
			var parameters =
			{
				pidditta					:	vEmployerID,
				palladata					:	vDateTo,
				pelencodipendenti			:	vEmployeesIDs === null || vEmployeesIDs.length > 0 ? vEmployeesIDs : [vEmployeesIDs],
				pesportadatianagrafici		:	vExportPersonalData === 1,
				pesportaaltridatianagrafici	:	vExportOtherPersonalData === 1,
				pesportariferimenti			:	vExportContactsData === 1,
				pesportadocumenti			:	vExportDocumentsData === 1,
				pesportainail				:	vExportInailData === 1,
				pesportarapportolavoro		:	vExportContractData === 1,
				pesportaclassificazioni		:	vExportClassificationsData === 1,
				pstampacopertina			:	vPrintSummary === 1
			}
			
			var operation = globals.startAsyncOperation
			(
				 globals.createReport
				,[
					globals.Server.MA_HR
					,parameters
					,'hr_anagraficadipendenti.jasper'
					,[['AnagraficaDipendenti', vEmployerName, utils.dateFormat(vDateTo,globals.ISO_DATEFORMAT)].join('_'),'pdf'].join('.')
				 ]
				, null
				, null
				, globals.OpType.SDA
			);
			
			/**
			 * Save additional operation's information
			 */
			operation.op_hash = utils.stringMD5HashBase64(vEmployerID + vDateTo.toString());
			operation.op_ditta = vEmployerID;
			operation.op_message = operation.operationlog_to_operationtype.descrizione + ' ' + utils.dateFormat(vDateTo,globals.EU_DATEFORMAT);
			operation.op_periodo = utils.dateFormat(vDateTo, globals.PERIODO_DATEFORMAT);
		}
		else
		{
			globals.ma_utl_showWarningDialog('Impostare una ditta ed almeno un\'opzione di esportazione','i18n:hr.msg.attention')
		}
	}
	catch(ex)
	{
		application.output(ex, LOGGINGLEVEL.ERROR);
	}
	finally
	{
		// Close this form					
		globals.svy_mod_closeForm(event);
	}
}

/**
 * @properties={typeid:24,uuid:"44AD1155-A17A-43BC-8CF1-C92C7F325E8E"}
 */
function checkExport()
{
	return	vExportClassificationsData 	||
			vExportContactsData 		||
			vExportContractData			||
			vExportDocumentsData		||
			vExportInailData			||
			vExportOtherPersonalData	||
			vExportPersonalData;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected 
 *
 * @properties={typeid:24,uuid:"49A9509A-5A09-4375-9F44-E822D24CE28F"}
 */
function onActionBtnOk(event)
{
	var choice = vFormat;
	switch(choice)
	{
		case globals.FileFormats.PDF:
			exportReport(event);
			break;
		case globals.FileFormats.EXCEL:
			exportExcel(event);
			break;
			
		default:
			globals.ma_utl_showWarningDialog('Selezionare il formato di esportazione', 'i18n:hr.msg.attention');
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C811D700-919F-4812-A73D-DC88ABB141B3"}
 */
function onActionBtnCancel(event)
{
	globals.svy_mod_closeForm(event);
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"DD1E31DB-8A31-458F-A973-023DC70C0541"}
 */
function onDataChangeSelection(oldValue, newValue, event)
{
	if(!(vExportClassificationsData || 
		 vExportContactsData 		||
		 vExportContractData 		||
		 vExportDocumentsData 		||
		 vExportInailData			||
		 vExportOtherPersonalData	||
		 vExportPersonalData))
	{
		forms[controller.getName()][event.getSource().getDataProviderID()] = oldValue;
		return false;
	}
	
	return true;
}

/**
 * Handle changed data.
 *
 * @param oldValue old value
 * @param newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"958DC945-47BC-417E-ACF5-19D950258228"}
 * @AllowToRunInFind
 */
function onDataChangeCodDitta(oldValue, newValue, event) 
{
	/** @type {JSFoundset<db:/ma_anagrafiche/ditte>} */
	var fs = databaseManager.getFoundSet(globals.nav.program[lkpDitta].server_name, globals.nav.program[lkpDitta].table_name);	//databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE, globals.Table.DITTE);
	if(fs && fs.find())
	{
		fs.codice = newValue;
		fs.tipologia = 0;		// gestite
		
		if(fs.search() > 0)
			updateEmployer(fs.getSelectedRecord());
		else
			globals.ma_utl_showLkpWindow({ event: event, returnField: 'vEmployerID', lookup: lkpDitta, methodToExecuteAfterSelection: 'updateEmployer', allowInBrowse: true });
	}
	
	if(vEmployerID)
	{
		elements.select_all_employees_btn.enabled = true;
		elements.employee_btn_search.enabled      = true;
	}
	else
	{
		elements.select_all_employees_btn.enabled = false;
		elements.employee_btn_search.enabled      = false;
	}

	return true
}

/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"397A471B-D550-4543-810B-90294538E94F"}
 */
function onLoad(event) 
{
	foundset.loadAllRecords();
	updateEmployer(foundset.getSelectedRecord());
}
