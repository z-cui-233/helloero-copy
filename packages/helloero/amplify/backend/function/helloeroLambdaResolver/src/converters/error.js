/* 
## correspoinding VDL response mapper should be: 
## Raise a GraphQL field error in case of a datasource invocation error
#if($ctx.result.errorInfo)
  $util.error($ctx.result.errorMessage, $ctx.result.errorType, null, $context.result.errorInfo)
#end

$util.toJson($context.result)
*/
const mapWabitErrorResponse = (response) => ({
  errorMessage: response.data.error.message,
  errorType: `${response.status}`,
  errorInfo: response.data.error,
});

module.exports = { mapWabitErrorResponse };
