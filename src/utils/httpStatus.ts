import httpStatus from "http-status";

interface HttpTemplates {
  // 100 -- information
  CONTINUE: typeof httpStatus.CREATED;
  SWITCHING_PROTOCOLS: typeof httpStatus.SWITCHING_PROTOCOLS;

  // 200
  OK: typeof httpStatus.OK;
  CREATED: typeof httpStatus.CREATED;
  ACCEPTED: typeof httpStatus.ACCEPTED;
  NON_AUTHORITATIVE_INFORMATION: typeof httpStatus.NON_AUTHORITATIVE_INFORMATION;
  NO_CONTENT: typeof httpStatus.NO_CONTENT;
  RESET_CONTENT: typeof httpStatus.RESET_CONTENT;

  // 300 Redirection responses
  MULTIPLE_CHOICES: typeof httpStatus.MULTIPLE_CHOICES;
  MOVED_PERMANENTLY: typeof httpStatus.MOVED_PERMANENTLY;
  FOUND: typeof httpStatus.FOUND;
  SEE_OTHER: typeof httpStatus.SEE_OTHER;
  NOT_MODIFIED: typeof httpStatus.NOT_MODIFIED;

  // 400
  BAD_REQUEST: typeof httpStatus.BAD_REQUEST;
  UNAUTHORIZED: typeof httpStatus.UNAUTHORIZED;
  PAYMENT_REQUIRED: typeof httpStatus.PAYMENT_REQUIRED;
  FORBIDDEN: typeof httpStatus.FORBIDDEN;
  NOT_FOUND: typeof httpStatus.NOT_FOUND;
  METHOD_NOT_ALLOWED: typeof httpStatus.METHOD_NOT_ALLOWED;
  TOO_MANY_REQUESTS: typeof httpStatus.TOO_MANY_REQUESTS;

  // 500
  INTERNAL_SERVER_ERROR: typeof httpStatus.INTERNAL_SERVER_ERROR;
  NOT_IMPLEMENTED: typeof httpStatus.NOT_IMPLEMENTED;
  BAD_GATEWAY: typeof httpStatus.BAD_GATEWAY;
  SERVICE_UNAVAILABLE: typeof httpStatus.SERVICE_UNAVAILABLE;
  NOT_EXTENDED: typeof httpStatus.NOT_EXTENDED;
}

const httpTemplates: HttpTemplates = {
  // 100 -- information
  CONTINUE: httpStatus.CREATED,
  SWITCHING_PROTOCOLS: httpStatus.SWITCHING_PROTOCOLS,

  // 200
  OK: httpStatus.OK,
  CREATED: httpStatus.CREATED,
  ACCEPTED: httpStatus.ACCEPTED,
  NON_AUTHORITATIVE_INFORMATION: httpStatus.NON_AUTHORITATIVE_INFORMATION,
  NO_CONTENT: httpStatus.NO_CONTENT,
  RESET_CONTENT: httpStatus.RESET_CONTENT,

  // 300 Redirection responses
  MULTIPLE_CHOICES: httpStatus.MULTIPLE_CHOICES,
  MOVED_PERMANENTLY: httpStatus.MOVED_PERMANENTLY,
  FOUND: httpStatus.FOUND,
  SEE_OTHER: httpStatus.SEE_OTHER,
  NOT_MODIFIED: httpStatus.NOT_MODIFIED,

  // 400
  BAD_REQUEST: httpStatus.BAD_REQUEST,
  UNAUTHORIZED: httpStatus.UNAUTHORIZED,
  PAYMENT_REQUIRED: httpStatus.PAYMENT_REQUIRED,
  FORBIDDEN: httpStatus.FORBIDDEN,
  NOT_FOUND: httpStatus.NOT_FOUND,
  METHOD_NOT_ALLOWED: httpStatus.METHOD_NOT_ALLOWED,
  TOO_MANY_REQUESTS: httpStatus.TOO_MANY_REQUESTS,

  // 500
  INTERNAL_SERVER_ERROR: httpStatus.INTERNAL_SERVER_ERROR,
  NOT_IMPLEMENTED: httpStatus.NOT_IMPLEMENTED,
  BAD_GATEWAY: httpStatus.BAD_GATEWAY,
  SERVICE_UNAVAILABLE: httpStatus.SERVICE_UNAVAILABLE,
  NOT_EXTENDED: httpStatus.NOT_EXTENDED,
};

export default httpTemplates;
