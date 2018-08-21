const esprima       = require('esprima'),
      escodegen     = require('escodegen'),
      estools       = require('estools'),
      estree_walker = require('estree-walker');

exports.addToMain = addToMain;

let dupe = false;

function addToMain (data, props, callback) {

  let ranarr = [],
    fil = esprima.parse(data,  {
      comment: true,
      range: true,
      tokens: true,
      attachComment: true
    });

  let els = fil.body[0].expression.callee.body.body[1].expression.callee.object.callee.object.arguments[1].elements;

  for(let i = 0; i < els.length; i++){
    if(els[i].value == props.module){
      dupe = true;
      break;
    }
    ranarr.push(els[i]);
  }

  if(!dupe) {

    fil.body[0].expression.callee.body.body[1].expression.callee.object.callee.object.arguments[1].elements.push({
      type: 'Literal',
      value: `${props.module}`,
      raw: `'${props.module}'`
    });

    let impArr = [];
    let nonArr = [];

    for(let i = 0; i < els.length; i++){
      if(els[i].value.substr(0, 2) === 'ng' || els[i].value.substr(0, 2) === 'ui'){
        impArr.push(els[i]);
      }else{
        nonArr.push(els[i]);
      }
    }

    nonArr.sort((a, b) => {
      if (a.value < b.value)
        return -1;
      if (a.value > b.value)
        return 1;
      return 0;
    });

    fil.body[0].expression.callee.body.body[1].expression.callee.object.callee.object.arguments[1].elements = impArr.concat(nonArr);

    removeDuplicateComments(fil);

    let newFile = escodegen.generate(fil, {
      parse: fil,
      comment: true,
      tokens: true,
      format: {
        indent: {
          style: '  ',
          base: 0,
          adjustMultilineComment: true
        },
        newline: '\n',
        space: ' ',
        json: false,
        renumber: false,
        hexadecimal: false,
        quotes: 'single',
        escapeless: false,
        compact: false,
        parentheses: true,
        semicolons: true,
        safeConcatenation: false
      }
    });

    return callback(true, newFile);

  } else {

    return callback(false);

  }

}

function removeDuplicateComments(ast) {
  // Some comments are duplicated as both the leadingComment for one node,
  // and the trailing comment for another. Every comment's range is unique,
  // so two comments with the same range are talking about the same comment.
  // So we'll just remove all trailing comments which are also a leading
  // comment somewhere.

  const rangesInLeadingComments = new Set();

  estree_walker.walk(ast, {
    enter: (node) => {
      for (let leadingComment of node.leadingComments || []) {
        rangesInLeadingComments.add(leadingComment.range.join(','));
      }
    }
  });
  estree_walker.walk(ast, {
    enter: (node) => {
      if (!node.trailingComments) {
        return;
      }
      node.trailingComments = node.trailingComments.filter((comment) => {
        return !rangesInLeadingComments.has(comment.range.join(','));
      });
    }
  });
}