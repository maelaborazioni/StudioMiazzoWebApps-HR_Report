/**
 * @type {Boolean}
 *
 * @properties={typeid:35,uuid:"7759C237-2E5A-47EE-9FD2-3E6D6BF87533",variableType:-4}
 */
var vClose = true;

/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"CF3E5B29-833E-4279-A32C-5A5C7F85133B",variableType:93}
 */
var vDateFrom = null;

/**
 * @type {Date}
 * 
 * @properties={typeid:35,uuid:"2AABF5B5-D313-4A96-9EEB-ED0B9D4B6279",variableType:93}
 */
var vDateTo = null;

/**
 * @type {Array}
 * @properties={typeid:35,uuid:"02666D6D-78B2-485A-8EE9-E39A38FAE63A",variableType:-4}
 */
var vEmployeesIDs = null;

/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"160E7704-14B9-457C-BA22-D3DF6E6587E6"}
 */
var vEmployeesNames = null;

/**
 * @type {Object}
 * 
 * @properties={typeid:35,uuid:"7D961E9D-FE67-4AC6-9696-E190DEBAC8F6",variableType:-4}
 */
var vEmployerID = null;

/**
 * @properties={typeid:35,uuid:"83409840-B114-4C9C-8BCB-C9EE89B74F71",variableType:-4}
 */
var vEmployerConvertedID = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"9E4556FF-5241-4F1E-B14B-6D29F52CCFEF"}
 */
var vEmployerName = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"6E9E9A23-3DB1-485D-8F58-93ADB5659812",variableType:4}
 */
var vFormat = 0;

/**
 * @type {String}
 * @properties={typeid:35,uuid:"078B4CBD-4E5D-4942-B330-DC36F10F8D39"}
 */
var vGroupBy = null;

/**
 * @type {String}
 * @properties={typeid:35,uuid:"377381EA-34DC-43C2-8C53-33E276134A6D"}
 */
var vGroupByName = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"CB411683-E095-4F64-BE33-D8150BAF6196",variableType:4}
 */
var vPrintSum = 0;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"0C466C02-270C-44F5-AD7F-3F2928ED55D9",variableType:4}
 */
var vPrintSummary = 0;

/**
 * @type {Array}
 * 
 * @properties={typeid:35,uuid:"57592461-39F0-41EF-814D-15D34F8607E6",variableType:-4}
 */
var vScopiRiclassificazioniIDs = null;

/**
 * @type {Object}
 * @properties={typeid:35,uuid:"66693B2E-8031-48FA-B232-E0A0A272C571",variableType:-4}
 */
var vScopoID = null;

/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"2F11F1FF-2F79-4257-806D-250028B6608F"}
 */
var vScopoName = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"079883CA-9836-4407-9EBB-88875A93C9F2",variableType:4}
 */
var vIncludiCessati = 0;

/**
 * @param {JSRecord} rec
 *
 * @properties={typeid:24,uuid:"7D7A74AB-4637-44FA-BEF4-6E2116574313"}
 * @AllowToRunInFind
 */
function updateEmployer(rec)
{
	if(rec)
	{
		// Clear any previous information
//		vEmployeesIDs = null
//		vEmployeesNames = null
		vScopoID = null
		vScopoName = null
		vGroupBy = null
		
		// Clear the foundsets of employees and scopiriclassificazioni
		forms[elements.dipendenti_tabless.getTabFormNameAt(1)].foundset.clear()
		forms[elements.scopiriclassificazioni_tabless.getTabFormNameAt(1)].foundset.clear()
			
		vEmployerID = rec['idditta'];
		vEmployerConvertedID = rec['idditta_sede'];
		
		elements.employee_btn_search.enabled = true
		elements.scopo_btn.enabled = true
		elements.group_by_btn.enabled = true
		elements.select_all_employees_btn.enabled = true
	}
}

/**
 * @param {JSRecord} record
 *
 * @properties={typeid:24,uuid:"15B73C99-EE67-4043-A385-BFF54E5B6D60"}
 */
function updateEmployee(record)
{
	updateMultipleEmployees([record]);
}

/**
 * @param {Array<JSRecord>} records
 *
 * @properties={typeid:24,uuid:"9F4BA19C-6AC1-4EAD-A86D-4EE466BFB844"}
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
		var _employeesFs = _formObj.foundset;//databaseManager.getFoundSet(globals.Server.MA_HR, 'lavoratori')

		if(_employeesFs.find())
		{
//			if(globals.isCliente())
//				_employeesFs.lavoratori_cliente_to_lavoratori.idlavoratoresede = vEmployeesIDs;
//			else
				_employeesFs.idlavoratore = vEmployeesIDs;
				
			_employeesFs.search();
		}
		
//		/** @type {Number} */
//		var _currTabIdx = elements.dipendenti_tabless.tabIndex
//		var _formObj = forms[elements.dipendenti_tabless.getTabFormNameAt(_currTabIdx)]
//		_formObj.controller.loadRecords(_employeesFs)
		_formObj.controller.sort(solutionModel.getForm(_formObj.controller.getName()).initialSort)
	}
}

/**
 * @param {JSRecord<db:/ma_hr/hrv_lkp_raggruppamenti>} rec
 *
 * @properties={typeid:24,uuid:"D2DA76A1-7733-414D-8A58-B095C4179FF5"}
 */
function updateGroupBy(rec)
{
	if(rec)
	{
		vGroupByName = rec.descrizione;
	}
}

/**
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"0C6CB282-44BB-4C19-963E-FADF53021F89"}
 */
function updateScopo(_rec)
{
	if(_rec)
	{
		vScopoName = _rec['descrizione']
	}
	// Clear the table of scopiriclassificazioni
	forms[elements.scopiriclassificazioni_tabless.getTabFormNameAt(elements.scopiriclassificazioni_tabless.tabIndex)].foundset.clear()
	
	elements.scoporiclassificazione_btn_search.enabled = true
	elements.select_all_scopiriclassificazioni_btn.enabled = true
}

/**
 * @param {JSFoundset} _foundset
 *
 * @properties={typeid:24,uuid:"3FA678E8-B165-4F1A-BA27-D7574A9E28D6"}
 * @AllowToRunInFind
 */
function filterEmployees(_foundset)
{
	if(vEmployerID)
	{
		_foundset.addFoundSetFilterParam('idditta','=', vEmployerID, 'employeesFilter');
		
		if(vDateTo)
			_foundset.addFoundSetFilterParam('assunzione','<=',vDateTo,'hiredEmployeesFilter')
			
		if(!vIncludiCessati)
			_foundset.addFoundSetFilterParam('cessazione', '^||>=', vDateTo || globals.TODAY);
	}
	
	return _foundset
}

/**
 * @param {JSFoundset} _foundset
 *
 * @properties={typeid:24,uuid:"63E5ED0A-40F5-434F-BA89-58ED831F8C3E"}
 */
function filterRaggruppamento(_foundset)
{
	if(vEmployerID)
	{
		_foundset.addFoundSetFilterParam('idditta','=',vEmployerConvertedID,'classificazioniDittaFilter')
	}
	
	return _foundset
}

/**
 * @properties={typeid:24,uuid:"E593591F-F0EE-4FC8-B8BA-B6D540E369C2"}
 * @AllowToRunInFind
 */
function filterScopo(fs)
{
	if(vEmployerConvertedID)
	{
		var scopiIds = [];

		/** @type {JSFoundset<db:/ma_hr/dittescopiriclassificazioni>} */
		var scopiRiclassificazioniFs = databaseManager.getFoundSet(globals.Server.MA_HR, 'dittescopiriclassificazioni');
		if(scopiRiclassificazioniFs && scopiRiclassificazioniFs.find())
		{
			scopiRiclassificazioniFs.idditta = vEmployerConvertedID;
			scopiIds = scopiRiclassificazioniFs.search() > 0 ? globals.foundsetToArray(scopiRiclassificazioniFs, 'idscopo') : [];
		}
		
		fs.addFoundSetFilterParam('idScopo', 'IN', scopiIds, 'scopoDittaFilter');
	}
	
	return fs
}

/**
 * @param {JSFoundset} _foundset
 *
 * @properties={typeid:24,uuid:"BBF37537-3345-4AC6-9F00-59FD540A0835"}
 */
function filterScopiRiclassificazioni(_foundset)
{
	if(vScopoID && vEmployerConvertedID)
	{
		_foundset.addFoundSetFilterParam('idscopo','=',vScopoID,'scopiRiclassificazioniScopoFilter')
		_foundset.addFoundSetFilterParam('idditta','=',vEmployerConvertedID,'scopiRiclassificazioniDittaFilter')
	}
	
	return _foundset
}

/**
 * @param {Array<JSRecord>} records
 *
 * @properties={typeid:24,uuid:"4E657D65-9D03-48AC-9C97-22037F259D3F"}
 * @AllowToRunInFind
 */
function updateScopiRiclassificazioni(records)
{
	if(records.length > 0)
	{		
		/** @type {JSFoundset<db:/ma_hr/dittescopiriclassificazioni>} */
		var _scopiRiclassificazioniFs = databaseManager.getFoundSet(globals.Server.MA_HR, 'dittescopiriclassificazioni')
		if(_scopiRiclassificazioniFs.find())
		{
			_scopiRiclassificazioniFs.iddittascoporiclassificazione = vScopiRiclassificazioniIDs
			_scopiRiclassificazioniFs.search()
		}
		
		var _formObj = forms[elements.scopiriclassificazioni_tabless.getTabFormNameAt(1)]
		_formObj.controller.loadRecords(_scopiRiclassificazioniFs)
		_formObj.controller.sort(solutionModel.getForm(_formObj.controller.getName()).initialSort)
	}
}

/**
 * @param {JSRecord} record
 *
 * @properties={typeid:24,uuid:"86FDED25-1ADF-4B36-AB0A-F20F2F8439A9"}
 */
function updateScopoRiclassificazione(record)
{
	updateScopiRiclassificazioni([record]);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"322C595A-158E-4AD1-8F4F-525D44922224"}
 */
function exportExcel(event) {
	try
	{
		if(checkData() && checkDates(event,true))
		{		
			if(vEmployerID && vScopoID)
			{
				var fieldsToExport =	['Intestazione',
				 						 'CodDitta',
				 						 'RagioneSociale',
				 						 'Codice',
				 						 'Nominativo',
				 						 'Assunzione',
				 						 'Cessazione',
				 						 'Periodo',
				 						 'CodSedeLavoro',
				 						 'SedeLavoro',
				 						 'CodCentroCosto',
										 'CentroCosto',
										 'CodRaggruppamento1',
										 'Raggruppamento1',
										 'CodRaggruppamento2',
										 'Raggruppamento2',
										 'CodRaggContabile',
										 'RaggContabile',
										 'CodContratto',
										 'Contratto',
										 'CodQualifica',
										 'Qualifica',
										 'Livello',
										 'PercPartTime',
										 'CodScopo',
										 'Scopo',
										 'Sezione',
										 'Dettaglio',
										 'Valore',
										 'CodTipologia'];
				
				var employeesToExport = vEmployeesIDs ? globals.foundsetToArray(forms[elements.dipendenti_tabless.getTabFormNameAt(1)].foundset, 'codice') : null;
				
				var args = [vEmployerID, vEmployerName, vDateFrom, vDateTo, vScopoID, employeesToExport, fieldsToExport.join(','), vScopiRiclassificazioniIDs];
				
				var dalPeriodo = utils.dateFormat(vDateFrom, globals.PERIODO_DATEFORMAT);
				var alPeriodo = utils.dateFormat(vDateTo, globals.PERIODO_DATEFORMAT)
				
				/** @type {JSDataSet} */
				var operation = globals.startAsyncOperation
					(
						 globals.createExcel
						,args
						,null
						,500
						,globals.OpType.EDR
					);
					
				/**
				 * Save additional the operation's information
				 */
				operation.op_hash = utils.stringMD5HashBase64(vEmployerID.toString() + dalPeriodo + alPeriodo);
				operation.op_ditta = vEmployerID;
				operation.op_message = operation.operationlog_to_operationtype.descrizione + ' ' + utils.dateFormat(vDateFrom, 'MM/yyyy') + ' - ' + utils.dateFormat(vDateTo, 'MM/yyyy');
				
				vClose = true;
			}
			else
			{
				globals.ma_utl_showWarningDialog('Impostare una ditta ed uno scopo');
				vClose = false;
			}
		}
		else
		{
			globals.ma_utl_showWarningDialog('Controllare che tutti i dati stiano stati compilati');
			vClose = false;
		}
		
		globals.svy_mod_closeForm(event);
	}
	catch(ex)
	{
		application.output(ex,LOGGINGLEVEL.ERROR);
	}
}

/**
 * @param {Boolean} _firstShow
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"2DCD023A-6770-4855-89DB-4A1849EC0C5D"}
 */
function onShowForm(_firstShow, _event)
{	
	_super.onShowForm(_firstShow,_event);
	controller.readOnly = false;
	
	resetAll();
}

/**
 * @properties={typeid:24,uuid:"CA81B4F3-F4E9-41BD-A9C3-D8127900FB8F"}
 */
function resetAll()
{
	var _jsForm = solutionModel.getForm(controller.getName());
	var _formVars = _jsForm.getVariables();
	for(var _var in _formVars)
	{
		var resetValue;
		switch(_formVars[_var].variableType)
		{
			case JSVariable.INTEGER:
			case JSVariable.NUMBER:
				resetValue = 0;
				break;
			default:
				resetValue = null;
		}
		
		forms[controller.getName()][_formVars[_var].name] = resetValue;
	}
	
	var _formPanels = _jsForm.getTabPanels();
	for(var _panel in _formPanels)
	{
		var _tabs = _formPanels[_panel].getTabs();
		for(var _tab in _tabs)
			forms[_tabs[_tab].containsForm.name].foundset.clear();
	}
	
	elements.scopo_btn.enabled = false;
	elements.group_by_btn.enabled = false;
	elements.employee_btn_search.enabled = false;
	elements.scoporiclassificazione_btn_search.enabled = false;
	elements.select_all_employees_btn.enabled = false;
	elements.select_all_scopiriclassificazioni_btn.enabled = false;
	elements.chk_stampacopertina.enabled =
	elements.chk_stampatotali.enabled = true;
}

/**
 * @properties={typeid:24,uuid:"6BD2FFEA-7958-44F5-9C8C-CE6164B0B37B"}
 */
function checkData()
{
	return vEmployerID > 0 && vScopoID > 0 && !globals.ma_utl_isNullOrEmpty(vEmployeesIDs) && !globals.ma_utl_isNullOrEmpty(vScopiRiclassificazioniIDs);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 * @param {Boolean} [checkNull] whether to check for null dates
 * 
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"FB60C531-0949-4CAD-8BDC-302871562A03"}
 */
function checkDates(event, checkNull) 
{
 	if(vDateFrom && vDateTo)
 	{
 		if(vDateTo >= vDateFrom)
 		{
 			if(vDateTo.getFullYear() != vDateFrom.getFullYear())
 			{
				var _diff = ((vDateTo.getFullYear() - vDateFrom.getFullYear()) * 12) - vDateFrom.getMonth() - vDateTo.getMonth()
				if(_diff < 0 || _diff > 12)
				{
					globals.ma_utl_showWarningDialog('Il periodo massimo consentito è di 12 mesi','i18n:svy.fr.lbl.excuse_me')
					return false
				}
				else
				{
					return true
				}
	 		}
 		}
 		else
 		{
 			globals.ma_utl_showWarningDialog('Il campo \'Dal\' non può essere minore del campo \'Al\'','i18n:hr.msg.attention')
			return false
 		}
 		
 		return true
 	}
 	else
 	{
 		return checkNull == false;
 	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"32C114E9-DA93-4363-A259-A9F0CDCC2AD9"}
 * @AllowToRunInFind
 */
function exportReport(event)
{
	try
	{
		if(checkData() && checkDates(event,true))
		{
			if(vEmployerID && vScopoID)
			{
				var fs = forms[elements.scopiriclassificazioni_tabless.getTabFormNameAt(1)].foundset;
				var elencodettaglio = globals.foundsetToArray(fs, 'scopiriclassificazioni_to_tipologieelementi.codice');
				
				var parameters =
				{
					pidditta			:	vEmployerID,
					pdalperiodo			:	vDateFrom.getFullYear() * 100 + vDateFrom.getMonth() + 1,
					palperiodo			:	vDateTo.getFullYear() * 100 + vDateTo.getMonth() + 1,
					pidscopo			:	vScopoID,
					pelencodipendenti	:	vEmployeesIDs === null || vEmployeesIDs.length > 0 ? vEmployeesIDs : [vEmployeesIDs],
					pelencodettaglio	:	elencodettaglio && elencodettaglio.length ? elencodettaglio : [elencodettaglio],
					pcamporagg			:	vGroupBy ? parseInt(vGroupBy,10) : -1,
					pstampacopertina	:	vPrintSummary === 1,
					pstampatotali		:	vPrintSum === 1
				};
				
				globals.startAsyncOperation
					(
						 globals.createReport
						,[
							globals.Server.MA_HR
							,parameters
							,'hr_dettaglioretributivo.jasper'
							,[['DettaglioRetributivo', utils.dateFormat(vDateFrom,'yyyyMM'), utils.dateFormat(vDateTo,'yyyyMM'), vEmployerName].join('_'), 'pdf'].join('.')
						 ]
						,null
						,null
						,globals.OpType.SDR
						, { op_ditta: vEmployerID }
					);
					
				vClose = true;
			}
			else
			{
				globals.ma_utl_showWarningDialog('Impostare una ditta ed uno scopo');
				vClose = false;
			}
		}
		else
		{
			globals.ma_utl_showWarningDialog('Controllare che tutti i dati siano stati compilati');
			vClose = false;
		}
		
		globals.svy_mod_closeForm(event);
	}
	catch(ex)
	{
		globals.ma_utl_logError(ex)
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C4E91C5D-9FF7-47D9-A206-49F668DF3ED4"}
 * @AllowToRunInFind
 */
function selectAllEmployees(event) 
{
	var fs = forms[elements.dipendenti_tabless.getTabFormNameAt(1)].foundset;
	
	/** @type {JSFoundset<db:/ma_anagrafiche/lavoratori>} */
	var _employeesFs = filterEmployees(fs.duplicateFoundSet());
	if (_employeesFs && _employeesFs.find())
	{
		/**
		 * Cerca i lavoratori con idditta equivalente a quello interno
		 */
		_employeesFs.idditta = vEmployerID;
			
		if(vDateTo)
			_employeesFs.assunzione = '<=' + utils.dateFormat(vDateTo,globals.ISO_DATEFORMAT);
		
		_employeesFs.search();
		_employeesFs.sort('lavoratori_to_persone.nominativo asc');
	}
	
	fs.loadRecords(_employeesFs);
	vEmployeesIDs = globals.foundsetToArray(fs, 'pkey');
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"2CC8F6B7-EB63-4BD0-A244-721B035C4D48"}
 */
function deselectAllEmployees(event) {
	vEmployeesIDs = [];
	forms[elements.dipendenti_tabless.getTabFormNameAt(1)].foundset.clear();
	
	globals.clearLookup('HR_Lkp_lavoratori_nosede');
	vEmployeesIDs = null;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"E99AA156-0444-4FC5-84B5-8B7534BB249D"}
 */
function deselectAllScopiriclassificazioni(event) {
	vScopiRiclassificazioniIDs = []
	forms[elements.scopiriclassificazioni_tabless.getTabFormNameAt(1)].foundset.clear()
	
	globals.clearLookup('HR_Lkp_lavoratori_scopiriclassificazioni');
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6E2B6CB7-8155-4079-BEC0-0A0E194DAD62"}
 * @AllowToRunInFind
 */
function selectAllScopiriclassificazioni(event) 
{
	/**
	 * Usa l'idditta sede invece che quello cliente
	 */
	var _scopiriclassificazioniFs = forms[elements.scopiriclassificazioni_tabless.getTabFormNameAt(1)].foundset;
	if(_scopiriclassificazioniFs.find())
	{
		_scopiriclassificazioniFs['idditta'] = vEmployerConvertedID;
		_scopiriclassificazioniFs['idscopo'] = vScopoID;
		_scopiriclassificazioniFs.search();
		
		vScopiRiclassificazioniIDs = globals.foundsetToArray(_scopiriclassificazioniFs, 'pkey');
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"9D4A0F47-1808-4A80-B078-8672750E5EC7"}
 */
function unsetGroupBy(event) {
	vGroupBy = null;
	vGroupByName = null;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"423320D2-0F6D-4CB6-9C6A-F7079336AEC4"}
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
 * @properties={typeid:24,uuid:"944B479B-7325-49B7-93A7-05B4EC80283F"}
 */
function onActionBtnCancel(event)
{
	globals.svy_mod_closeForm(event);
}

/**
 * @properties={typeid:24,uuid:"3797CAE5-7CC7-48A4-A243-70C95B40F422"}
 */
function onHide(event)
{
	if(_super.onHide(event))
	{
		return vClose;
	}
	
	return false;
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
 * @properties={typeid:24,uuid:"7958D7B6-DFC6-4F66-865E-901DAE2E4AF4"}
 */
function onDataChangeFormato(oldValue, newValue, event)
{
	if(newValue === globals.FileFormats.EXCEL)
	{
		elements.group_by_btn.enabled = false;
		elements.chk_stampacopertina.enabled = false;
		elements.chk_stampatotali.enabled = false;
//		elements.select_all_employees_btn.enabled = false;
//		elements.select_all_scopiriclassificazioni_btn.enabled = false;
//		elements.employee_btn_search.enabled = false;
//		elements.scoporiclassificazione_btn_search.enabled = false;
	}
	else
	{
		elements.group_by_btn.enabled = !!vEmployerID && true;
		elements.chk_stampacopertina.enabled = true;
		elements.chk_stampatotali.enabled = true;
		elements.select_all_employees_btn.enabled = !!vEmployerID && true;
//		elements.select_all_scopiriclassificazioni_btn.enabled = !!vScopoID && true;
//		elements.employee_btn_search.enabled = !!vEmployerID && true;
//		elements.scoporiclassificazione_btn_search.enabled = !!vScopoID && true;
	}
	
	return true
}

/**
 * Handle changed data.
 *
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @returns {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D3636ECA-6C7A-43ED-AA70-6041D8787ADD"}
 */
function onDataChange$cessati(oldValue, newValue, event)
{
	var fs = forms[elements.dipendenti_tabless.getTabFormNameAt(1)].foundset;
	if (fs && fs.getSize() > 0)
	{
		var filteredFs = filterEmployees(fs.duplicateFoundSet());
			filteredFs.loadAllRecords();
		
		fs.loadRecords(filteredFs);
	}
		
	return true;
}
