/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"F003B9E3-31C3-4BFD-9DDB-0CEE02D2500A",variableType:4}
 */
var vDetailToExport = 0;

/**
 * @type {Object}
 * 
 * L'identificativo della ditta selezionata, così come specificato lato sede
 * 
 * @properties={typeid:35,uuid:"4735C335-FFC6-453E-8BC6-D674AD45F4CB",variableType:-4}
 */
var vEmployerID = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"42AABD70-27CC-449D-A99C-FC436EC817FD"}
 */
var vEmployerName = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"166AB5D0-7FE1-4DAB-A1BD-C5CF9D4A3DAE",variableType:4}
 */
var vPrintSummary = 0;

/**
 * @type {Object}
 * @properties={typeid:35,uuid:"BF6475C3-0FDA-4A27-9E6C-E21F6075764B",variableType:-4}
 */
var vScopoID = null;

/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"70AD34BB-5776-4976-BC3A-26F183C76197"}
 */
var vScopoName = null;

/**
 * @type {String}
 * 
 * @properties={typeid:35,uuid:"87130386-8FC8-4760-864B-3938660A071F"}
 */
var vTipologiaCode = '';

/**
 * @type {Number}
 * 
 * @properties={typeid:35,uuid:"CD1D751E-BEA1-406C-8E32-68685ED01293",variableType:8}
 */
var vTipologiaId = null;

/**
 * @param {JSRecord} rec
 *
 * @properties={typeid:24,uuid:"10C269E3-F69A-4E53-9E4E-B7A15A483895"}
 * @AllowToRunInFind
 */
function updateEmployer(rec)
{
	if(rec)
	{
		// Clear any previous information
//		vEmployeesIDs = null
//		vEmployeesNames = null
		vScopoID = null;
		vScopoName = null;
		vEmployerID = rec['idditta_sede'];
		elements.scopo_btn.enabled = true;
	}
}

/**
 * @param {JSRecord} record
 *
 * @properties={typeid:24,uuid:"6CD091B3-D2CE-4AC5-8A62-3D3E0D3916B0"}
 * @AllowToRunInFind
 */
function updateTipologia(record)
{
	if(record)
	{
		forms[elements.tipologia_tabless.getTabFormNameAt(1)].foundset.loadRecords(vTipologiaId);
		vTipologiaCode = record['codice'];
	}
}

/**
 * @param {JSRecord} _rec
 *
 * @properties={typeid:24,uuid:"E5958546-90BE-43D1-A9C5-03CB4BDF3BDB"}
 */
function updateScopo(_rec)
{
	if(_rec)
	{
		vScopoName = _rec['descrizione']
	}
	
	// Clear the table of scopiriclassificazioni
	unselectAllTypes(null);
	
	elements.btn_search_type.enabled = true
	elements.btn_select_all_types.enabled = true
}

/**
 * @param {JSFoundset} _foundset
 *
 * @properties={typeid:24,uuid:"9860AECE-9562-449A-A027-78A9E1A73917"}
 * @AllowToRunInFind
 */
function filterScopo(_foundset)
{
	if(vEmployerID)
	{
		var _scopiIds = []
		
		var _fs = databaseManager.getFoundSet(globals.Server.MA_HR, 'dittescopiriclassificazioni');
		if(_fs.find())
		{
			_fs['idditta'] = vEmployerID;
			_scopiIds = _fs.search() > 0 ? globals.foundsetToArray(_fs,'idscopo') : [];
		}
		
		_foundset.addFoundSetFilterParam('idScopo', 'IN', _scopiIds, 'scopoDittaFilter');
	}
	
	return _foundset;
}

/**
 * @param {JSFoundset} fs
 *
 * @properties={typeid:24,uuid:"BB3E86D5-8EF4-4B78-B0B1-0DE060376BCA"}
 * @AllowToRunInFind
 */
function filterTipologia(fs)
{
	/** @type {JSFoundset<db:/ma_hr/dittescopiriclassificazioni>} */
	var scopiriclassificazioniFs = databaseManager.getFoundSet(globals.Server.MA_HR, 'dittescopiriclassificazioni');
	if(scopiriclassificazioniFs && scopiriclassificazioniFs.find())
	{
		scopiriclassificazioniFs.idditta = vEmployerID
		scopiriclassificazioniFs.idscopo = vScopoID
		scopiriclassificazioniFs.search();
	}
	
	fs.addFoundSetFilterParam('idtipologiaelemento', 'IN', globals.foundsetToArray(scopiriclassificazioniFs, 'scopiriclassificazioni_to_tipologieelementi.idtipologiaelemento'), 'ftr_tipologia');
	return fs;
}

/**
 * @param {Boolean} _firstShow
 * @param {JSEvent} _event
 *
 * @properties={typeid:24,uuid:"32C99664-3403-4EE3-A9C6-CA031C41E9E8"}
 */
function onShowForm(_firstShow, _event)
{	
	_super.onShowForm(_firstShow,_event);
	controller.readOnly = false;
	resetAll();
}

/**
 * @properties={typeid:24,uuid:"F5411931-097A-4B28-92DA-D576A16E9AF9"}
 */
function onHide(event)
{
	if(_super.onHide(event))
	{
		controller.readOnly = true;
		return true;
	}
	
	return false;
}

/**
 * @properties={typeid:24,uuid:"D9452A87-2CB0-4AD2-812E-040C5BE7B303"}
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
	elements.btn_search_type.enabled = false;
	elements.btn_select_all_types.enabled = false;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C0047822-1F56-413A-B607-DB3434B00D90"}
 * @AllowToRunInFind
 */
function exportReport(event)
{
	try
	{
		if(vEmployerID && vScopoID && vTipologiaCode != null)
		{
			var parameters =
			{
				pidditta			:	vEmployerID,
				pidscopo			:	vScopoID,
				ptipologia			:	vTipologiaCode,
				pnonriclassificati	:	vDetailToExport === 1,
				pstampacopertina	:	vPrintSummary === 1
			};
			
			var operation = globals.startAsyncOperation
			(
				 globals.createReport
				,[
					 globals.Server.MA_HR
					,parameters
					,'HR_ControlloAssociazioni.jasper'
					,[['ControlloAssociazioni', vScopoName, vEmployerName].join('_'),'pdf'].join('.')
				 ]
				,null
				,null
				,globals.OpType.SCA
			);
			
			/**
			 * Save additional operation's information
			 */
			operation.op_hash = application.getUUID();	// don't want to block other users...
			operation.op_ditta = vEmployerID;
			operation.op_message = operation.operationlog_to_operationtype.descrizione;
		}
		else
		{
			globals.ma_utl_showWarningDialog('Impostare una ditta, uno scopo ed una tipologia');
		}
	}
	catch(ex)
	{
		application.output(ex,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		// Close this form					
		globals.svy_mod_closeForm(event);
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"4E8188BF-D826-4320-9E0B-6A3028D5F674"}
 * @AllowToRunInFind
 */
function selectAllTypes(event) 
{
	vTipologiaId = null;
	vTipologiaCode = '';
	
	/** @type {JSFoundset<db:/ma_hr/dittescopiriclassificazioni>} */
	var scopiriclassificazioniFs = databaseManager.getFoundSet(globals.Server.MA_HR, 'dittescopiriclassificazioni');
	if(scopiriclassificazioniFs && scopiriclassificazioniFs.find())
	{
		scopiriclassificazioniFs.idditta = vEmployerID
		scopiriclassificazioniFs.idscopo = vScopoID
		scopiriclassificazioniFs.search();
	}
	
	var tipologiaFs = forms[elements.tipologia_tabless.getTabFormNameAt(1)].foundset;
	tipologiaFs.removeFoundSetFilterParam('ftr_tipologia');
	tipologiaFs.addFoundSetFilterParam('idtipologiaelemento', 'IN', globals.foundsetToArray(scopiriclassificazioniFs, 'scopiriclassificazioni_to_tipologieelementi.idtipologiaelemento'), 'ftr_tipologia');
	tipologiaFs.loadAllRecords();
	tipologiaFs.sort('ordine asc');
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D854D09E-04CB-4038-8C00-87A816490237"}
 */
function unselectAllTypes(event)
{
	vTipologiaId = null;
	forms[elements.tipologia_tabless.getTabFormNameAt(1)].foundset.clear();	
	globals.clearLookup('HR_Lkp_tipologia_elementi');
}

/**
 * @AllowToRunInFind
 * 
 * // TODO generated, please specify type and doc for the params
 * @param {Object} scopoId
 *
 * @properties={typeid:24,uuid:"03FF952B-D497-4D6B-B866-59969904E4AD"}
 */
function getTypes(scopoId)
{
	/** @type {JSFoundset<db:/ma_hr/tabtipologieelementi>} */
	var tipologieFs = databaseManager.getFoundSet(globals.Server.MA_HR, 'tabtipologieelementi');
	if(tipologieFs.find())
	{
		tipologieFs.tipologieelementi_to_scopitipologieelementi.idscopo = scopoId;
		tipologieFs.search();
	}
	
	return tipologieFs;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"79B0B36D-60B2-4671-89F6-733CF52E6844"}
 */
function onActionBtnOk(event)
{
	exportReport(event);
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"438B11FF-FF5B-4CC4-9FC0-F8593D1DDE49"}
 */
function onActionBtnCancel(event)
{
	globals.svy_mod_closeForm(event);
}
