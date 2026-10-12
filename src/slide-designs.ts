import * as engine from './prisma-presentation';
import {creationTemplate} from '@prisma/core/template-catalog';
const E=914400;
export const presentationDesigns=[
 {id:'prisma',name:'Prisma',accent:'#6254c8',background:'#ffffff',text:'#293246'},
 {id:'ocean',name:'Océano',accent:'#147d80',background:'#f2faf9',text:'#214348'},
 {id:'ink',name:'Tinta',accent:'#bdafe9',background:'#24213c',text:'#ffffff'},
 {id:'sand',name:'Arena',accent:'#a46b39',background:'#fcf7ef',text:'#514235'},
 {id:'blue',name:'Editorial',accent:'#386b9a',background:'#f6f8fd',text:'#2b3b50'},
];
export function box(slide:any,text:string,x:number,y:number,w:number,h:number,size:number,color:string,bold=false){engine.addElement(slide,{kind:'textbox',offset:{x:x*E,y:y*E,cx:w*E,cy:h*E},paragraphs:text.split('\n').map(line=>({runs:[{text:line,fontFamily:'Carlito',fontSize:size,color,bold}]}))});}
export function rect(slide:any,x:number,y:number,w:number,h:number,color:string){engine.addElement(slide,{kind:'rect',offset:{x:x*E,y:y*E,cx:w*E,cy:h*E},fillColor:color});}
export function buildPresentationTemplate(opened:any,id:string){
 creationTemplate('slides',id);if(id==='blank')return opened;
 const palette=presentationDesigns.find(d=>d.id===(id==='lesson'?'ocean':id==='portfolio'?'sand':id==='report'?'blue':'prisma'))!;
 const topics:Record<string,string[]>={pitch:['Tu propuesta','La oportunidad','Próximos pasos'],lesson:['Tema de la clase','Conceptos principales','Ponlo en práctica'],report:['Informe de resultados','Resultados principales','Conclusiones'],portfolio:['Tu nombre y profesión','Proyectos seleccionados','Contacto']};
 const bodies:Record<string,string[]>={pitch:['Nombre del proyecto\nAutor · Fecha','Describe la necesidad y la solución propuesta.','Define responsables, fechas y acciones.'],lesson:['Nombre de la asignatura\nDocente · Fecha','Explica los conceptos y añade ejemplos.','Plantea una actividad y los criterios de revisión.'],report:['Proyecto · Autor · Fecha','Presenta los resultados y las evidencias.','Explica lo aprendido y las acciones recomendadas.'],portfolio:['Una breve presentación de tu trabajo.','Describe los proyectos y tu contribución.','Correo · Sitio web · Redes profesionales']};
 topics[id].forEach((title,i)=>{if(i)engine.insertBlankSlide(opened,i-1);const slide=opened.deck.slides[i];engine.setSlideBackground(opened,slide,palette.background);rect(slide,0,0,.16,7.5,palette.accent);box(slide,title,.8,i?1:1.7,10.9,1.3,i?36:46,palette.text,true);rect(slide,.8,i?2.4:3.3,1.05,.05,palette.accent);box(slide,bodies[id][i],.8,i?2.8:3.7,10.8,2.1,22,palette.text);box(slide,String(i+1),11.9,6.85,.55,.3,12,palette.accent);});return opened;
}
export function applyPresentationDesign(opened:any,id:string){const design=presentationDesigns.find(d=>d.id===id);if(!design)throw Error('Diseño desconocido.');const visit=(element:any)=>{for(const paragraph of element.text?.paragraphs??[])for(const run of paragraph.runs??[]){run.color=design.text;run.fontFamily='Carlito';element.dirty=true;}for(const child of element.children??[])visit(child);for(const row of element.rows??[]){for(const cell of row)visit(cell);element.dirty=true;}};for(const slide of opened.deck.slides){engine.setSlideBackground(opened,slide,design.background);slide.elements.forEach(visit);}}
