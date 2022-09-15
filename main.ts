
/**
 * reference: C'STACK 
 * 
 * Let's Build a Simple Database
   Writing a sqlite clone from scratch in C

   link : https://cstack.github.io/db_tutorial/
 */


const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});




enum StatementType {
    STATEMENT_INSERT,
    STATEMENT_SELECT
}



interface Statement {
    type: StatementType,


}



let statement: Statement | null = null

enum Metaresult {
    META_SUCCESS,
    META_UNKOWN
    

}


enum PrepareResult {
    PREPARE_SUCCESS, 
    PREPARE_UNRECOGNIZED
}



function executeMetaCommand(command:string): Metaresult{
    command = command.trim()
   if(command === ".exit"){
      
        readline.close();
        process.exit(0)
      
   }else if(command === ".version"){
    console.log('\x1b[33m 1.0.0 \x1b[0m');
       return Metaresult.META_SUCCESS
   }
   

   return Metaresult.META_UNKOWN
 

}


function prepareStatement(command:string, store: Statement) : PrepareResult{
    let Processed:string[] = command.trim().split(" ");

    if(Processed[0] === "insert"){
        statement = {type: StatementType.STATEMENT_INSERT};
        return PrepareResult.PREPARE_SUCCESS

    }else if(Processed[0] === "select"){

        statement = {type: StatementType.STATEMENT_SELECT};
        return PrepareResult.PREPARE_SUCCESS
    }

    statement = null;
    return PrepareResult.PREPARE_UNRECOGNIZED
}


function executeStatement(statement: Statement){

    switch (statement.type) {
        case StatementType.STATEMENT_INSERT:
            console.log("This is where we perfom an insert")
            
            break;
        case StatementType.STATEMENT_SELECT:
            console.log("this is where we perform a select")
        default:
            break;
    }
      
}


function createNewQ(){

    readline.question("Typed-db > ", function (command: string) {
        //  let Processed:string[] = command.trim().split(" ");
    
         if(command[0].trim()  === "."){
                   // process meta commands
              
                   switch (executeMetaCommand(command)) {
                       case Metaresult.META_SUCCESS:
                       
                           createNewQ();
                           return;
                        case Metaresult.META_UNKOWN:
                            console.log(`meta command ${command} unrecognize`);
                            createNewQ()
                            return;
                   
                       default:
                           console.warn(`meta command ${command} unrecognized`);
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
                console.warn(`statement ${command} unrecognized`);
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


createNewQ()





