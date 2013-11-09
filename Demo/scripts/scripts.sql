CREATE TABLE smallslate.userdetails (
  userId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  providerId VARCHAR(1000) NOT NULL,
  firstName VARCHAR(1000) NULL,
  lastName VARCHAR(1000) NULL,
  PRIMARY KEY (userId),
  UNIQUE INDEX userId_UNIQUE (userId ASC));

CREATE TABLE category (
  categoryId bigint unsigned NOT NULL AUTO_INCREMENT,
  categoryName varchar(100) NOT NULL,
  categoryDescr varchar(1000) DEFAULT NULL,
  categoryImg varchar(1000) DEFAULT NULL,
  categoryCode varchar(10) DEFAULT 'CODE',
  isPublished varchar(1) DEFAULT 'N',
  PRIMARY KEY (categoryId),
  UNIQUE KEY category_id_UNIQUE (categoryId)
)

CREATE TABLE smallslate.subcategory (
  subCategoryId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  subCategoryName VARCHAR(100) NOT NULL,
  categoryId BIGINT unsigned NOT NULL, 
  subCategoryDescr VARCHAR(500) NULL,
  subCategoryImg VARCHAR(1000) NULL,
  subCategoryCode varchar(100) DEFAULT 'CODE',
  isActive VARCHAR(1) NOT NULL DEFAULT 'N',
  numberOfQuizzes BIGINT UNSIGNED DEFAULT 0,
  numberOfExams BIGINT UNSIGNED DEFAULT 0,
  PRIMARY KEY (subCategoryId),
  CONSTRAINT fk_category 
  FOREIGN KEY (categoryId) 
  REFERENCES category (categoryId) 
  ON DELETE CASCADE);
  
  CREATE TABLE quizdetails (
  quizId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  quizName MEDIUMTEXT NOT NULL,
  quizNameIsRich varchar(1) NOT NULL DEFAULT 'F',
  quizDescr MEDIUMTEXT NULL,
  quizDescrIsRich varchar(1) NOT NULL DEFAULT 'F',
  categoryId BIGINT NOT NULL,
  subCategoryId BIGINT NOT NULL,
  quizImgUrl VARCHAR(1000) NULL,
  createdBy BIGINT UNSIGNED NOT NULL,
  createdDate DATETIME NULL,
  updatedBy BIGINT UNSIGNED NULL,
  updatedDate DATETIME NULL,
  isActive VARCHAR(1) NOT NULL DEFAULT 'Y',
  numberOfQuestions INT NULL DEFAULT 0,
  numOfLevel1Questions INT NULL DEFAULT 0,
  numOfLevel2Questions INT NULL DEFAULT 0,
  numOfLevel3Questions INT NULL DEFAULT 0,
  accessCount BIGINT NULL DEFAULT 0,
  isQuizPublished VARCHAR(1) NOT NULL DEFAULT 'N',
  quizType VARCHAR(5) NOT NULL DEFAULT 'EXAM',
  offline VARCHAR(1) NOT NULL DEFAULT 'N',
  quizTime int NOT NULL DEFAULT 0,
  PRIMARY KEY (quizId),
  UNIQUE INDEX quizId_UNIQUE (quizId ASC));
  
  CREATE TABLE questionDetails (
  questionId BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  quizId BIGINT UNSIGNED NOT NULL,
  questionNumber BIGINT UNSIGNED NOT NULL,
  question MEDIUMTEXT NOT NULL,
  questionIsRich VARCHAR(5) DEFAULT 'false',
  option1 MEDIUMTEXT NULL,
  option1IsRich VARCHAR(5) DEFAULT 'false',
  option2 MEDIUMTEXT NULL,
  option2IsRich VARCHAR(5) DEFAULT 'false',
  option3 MEDIUMTEXT NULL,
  option3IsRich VARCHAR(5) DEFAULT 'false',
  option4 MEDIUMTEXT NULL,
  option4IsRich VARCHAR(5) DEFAULT 'false',
  option5 MEDIUMTEXT NULL,
  option5IsRich VARCHAR(5) DEFAULT 'false',
  answer VARCHAR(2000) NOT NULL,
  answerDescr MEDIUMTEXT NULL,
  answerDescrIsRich VARCHAR(5) DEFAULT 'false',
  questionType VARCHAR(10) NULL DEFAULT 'MOSA',
  updatedBy BIGINT UNSIGNED NOT NULL,
  isActive VARCHAR(1) NOT NULL DEFAULT 'Y',
  difficultyLevel int NOT NULL DEFAULT 0,
  questionTime int NOT NULL DEFAULT 0,
  PRIMARY KEY (questionid),
  UNIQUE INDEX questionid_UNIQUE (questionid ASC),
  CONSTRAINT fk_quizdetails 
  FOREIGN KEY (quizId) 
  REFERENCES quizdetails (quizId) 
  ON DELETE CASCADE);
  
  
  
  
  