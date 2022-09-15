/**
 * reference: C'STACK
 *
 * Let's Build a Simple Database
   Writing a sqlite clone from scratch in C

   link : https://cstack.github.io/db_tutorial/
 */
var readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});
var StatementType;
(function (StatementType) {
    StatementType[StatementType["STATEMENT_INSERT"] = 0] = "STATEMENT_INSERT";
    StatementType[StatementType["STATEMENT_SELECT"] = 1] = "STATEMENT_SELECT";
})(StatementType || (StatementType = {}));
var statement = null;
var Metaresult;
(function (Metaresult) {
    Metaresult[Metaresult["META_SUCCESS"] = 0] = "META_SUCCESS";
    Metaresult[Metaresult["META_UNKOWN"] = 1] = "META_UNKOWN";
})(Metaresult || (Metaresult = {}));
var PrepareResult;
(function (PrepareResult) {
    PrepareResult[PrepareResult["PREPARE_SUCCESS"] = 0] = "PREPARE_SUCCESS";
    PrepareResult[PrepareResult["PREPARE_UNRECOGNIZED"] = 1] = "PREPARE_UNRECOGNIZED";
})(PrepareResult || (PrepareResult = {}));
function executeMetaCommand(command) {
    command = command.trim();
    if (command === ".exit") {
        readline.close();
        process.exit(0);
    }
    else if (command === ".version") {
        console.log('\x1b[33m 1.0.0 \x1b[0m');
        return Metaresult.META_SUCCESS;
    }
    return Metaresult.META_UNKOWN;
}
function prepareStatement(command, store) {
    var Processed = command.trim().split(" ");
    if (Processed[0] === "insert") {
        statement = { type: StatementType.STATEMENT_INSERT };
        return PrepareResult.PREPARE_SUCCESS;
    }
    else if (Processed[0] === "select") {
        statement = { type: StatementType.STATEMENT_SELECT };
        return PrepareResult.PREPARE_SUCCESS;
    }
    statement = null;
    return PrepareResult.PREPARE_UNRECOGNIZED;
}
function executeStatement(statement) {
    switch (statement.type) {
        case StatementType.STATEMENT_INSERT:
            console.log("This is where we perfom an insert");
            break;
        case StatementType.STATEMENT_SELECT:
            console.log("this is where we perform a select");
        default:
            break;
    }
}
function createNewQ() {
    readline.question("Typed-db > ", function (command) {
        //  let Processed:string[] = command.trim().split(" ");
        if (command[0].trim() === ".") {
            // process meta commands
            switch (executeMetaCommand(command)) {
                case Metaresult.META_SUCCESS:
                    createNewQ();
                    return;
                case Metaresult.META_UNKOWN:
                    console.log("meta command " + command + " unrecognize");
                    createNewQ();
                    return;
                default:
                    console.warn("meta command " + command + " unrecognized");
                    createNewQ();
                    break;
            }
        }
        // let statement:Map<any, any> =  new Map;
        // simple parser
        switch (prepareStatement(command, statement)) {
            case PrepareResult.PREPARE_SUCCESS:
                break;
            case PrepareResult.PREPARE_UNRECOGNIZED:
                console.warn("statement " + command + " unrecognized");
                createNewQ();
                break;
            default:
                break;
        }
        // simple vm
        //  console.log("executing statement")
        executeStatement(statement);
        createNewQ();
    });
}
createNewQ();
