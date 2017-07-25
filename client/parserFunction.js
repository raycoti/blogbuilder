const myFilter =(string, word)=>{
    const bad = ['<em>','<strong>','<u>','</em>','</strong>','</u>','<blockquote>', '</ blockquote>', '</a>']
    return string.indexOf(word)!==-1 && !bad.includes(word) && word.indexOf('<img') ===-1 && word.indexOf('<a') ===-1;
}

const getStartEnd=(html)=>{
    const reg = /\<(..*?)\>/;
    html = html.replace(/<br>/g,'')
    html = html.replace(/<img/g,'<img class="img-thumbnail" ')
    
    const elements= html.split(reg).map(word=> `<${word}>`).filter(word => myFilter(html,word))
    const starts = [];
    const ends = [];
    elements.forEach(element=>{
      element.includes('/') ? ends.push(element) : starts.push(element);
    })
    return {starts, ends}
  }

const getIndexes=(html)=>{
    const {starts,ends} = getStartEnd(html);
    const types = [...starts]
    const stack = [];
    const indexes = [];
    let head = starts.shift();
    let tail = ends.shift();
    let s = html.indexOf(head)+head.length;
    let e = html.indexOf(tail);
    indexes.push({s,e})
    while(starts.length){
      head = starts.shift();
      tail = ends.shift();
      s = html.indexOf(head,s)+head.length;
      e = html.indexOf(tail,e+3);
      indexes.push({s,e}) 
    }
    
    return {indexes,types}
}

export default getIndexes;