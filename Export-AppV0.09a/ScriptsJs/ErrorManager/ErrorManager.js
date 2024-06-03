const TypeOfData  = {
	IsArray: arg => Array.isArray(arg),
	IsNode: arg => arg instanceof Node,
	IsObject: arg => arg instanceof Object,
	IsDate: arg => arg instanceof Date,
	IsRegEx: arg => arg instanceof RegExp,
	IsString: arg => typeof arg === "string",
	IsNumber: arg => typeof arg === "number",
	IsBoolean: arg => typeof arg === "boolean",
	IsFunction: arg => typeof arg==="function",
};

function TypeOf(item){
	if(!item){return item}
	let TypeItem;
	for(let type in TypeOfData){
		if(TypeOfData.hasOwnProperty(type) && TypeOfData[type](item)){
			TypeItem=type.replace("Is","");
			break;
		}
	}
	return TypeItem;
}

