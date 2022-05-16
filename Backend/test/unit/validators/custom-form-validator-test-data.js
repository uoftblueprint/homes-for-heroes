const validQuestionsList = [
    {
        type: 1,
        question: 'Question 1',
        options: [],
        required: false,
    },
    {
        type: 3,
        question: 'Question 3',
        options: ['Option1', 'Option2'],
        required: false,
    },
    {
        type: 7,
        question: 'Question 7',
        options: ['Option1', 'Option2'],
        rows: ['Row 1', 'Row 2'],
        required: true,
    }
]

const invalidInputQuestionEmpty = {
    type: 1,
    question: '',
    required: false,
}

const invalidQuestionType = {
    type: 13,
    question: 'Question Invalid Type',
    required: false,
}

const invalidQuestionRequired = {
    type: 2,
    question: 'Question Invalid Required',
    required: '',
}

const invalidOptionQuestionList = [
    {
        type: 3,
        question: 'Question 3 No Option',
        options: [],
        required: true,
    },
    {
        type: 4,
        question: 'Question 4 Empty Option',
        options: ['Option1', ''],
        required: true,
    },
    {
        type: 5,
        question: 'Question 5 Duplicate Option',
        options: ['Option1', 'Option1'],
        required: false,
    }
]

const invalidGridQuestionList = [
    ...validQuestionsList,
    {
        type: 7,
        question: 'Question 7 No row',
        options: ['Option1', 'Option2'],
        required: false,
    },
    {
        type: 7,
        question: 'Question 7 No row',
        options: ['Option1', 'Option2', 'Option3'],
        rows: ['Row1', 'Row2', 'Row3', '', 'Row5'],
        required: false,
    },
    {
        type: 8,
        question: 'Question 7 No row',
        options: ['Option1', 'Option2', 'Option3'],
        rows: ['Row1', 'Row2', 'Row3', 'Row1'],
        required: false,
    }
]

const testFormBody = (testQuestions) => {
    return {
        form_body: {
            questions: testQuestions
        }
    };
}

const CustomFormValidatorTestData = {
    validFormFields: {
        admin_id: 1,
        title: 'Form Title',
        curr_level: ['l1', 'l2'],
    },
    invalidFormFields:  {
        title: '',
        curr_level: ['l1', 'l2', 'l3', ';4']
    },
    noQuestionFormBody: testFormBody([]),
    validFormBody: testFormBody(validQuestionsList),
    invalidTypeFormBody: testFormBody([
        ...validQuestionsList,
        {...invalidQuestionType},
    ]),
    invalidRequiredFormBody: testFormBody([
        {...invalidQuestionRequired},
        ...validQuestionsList,
    ]),
    invalidInputFormBody: testFormBody([invalidInputQuestionEmpty]),
    invalidOptionFormBody: testFormBody(invalidOptionQuestionList),
    invalidGridFormBody: testFormBody(invalidGridQuestionList),
}

module.exports = CustomFormValidatorTestData