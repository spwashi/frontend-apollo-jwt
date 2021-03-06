import {ConceptTag} from './join/tag';
import React, {useState} from 'react';
import {IConcept_Complete, IConceptTag_Complete} from '../../../../../../app/models/concept/hybrids';
import {useActiveConcept} from '../context/context';
import {convertFromRaw, Editor, EditorState} from 'draft-js';
import {Log} from '../../../../../../components/Log';
import '../styles/concept.scss';
import {IConcept} from '../../../../../../app/models/concept/models';
import {ErrorBoundary} from '../../../../../../components/error';
import {DeleteConceptButton} from './DeleteButton';

function RichText({src}: { src: string }) {
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(convertFromRaw(JSON.parse(src))));
  return <Editor readOnly onChange={setEditorState} editorState={editorState}/>
}

interface ConceptDisplayParams {concept: IConcept | IConcept_Complete;}


function Internal({concept}: ConceptDisplayParams) {
  const {id, title, contentType, src, ConceptTag: conceptTags} = concept as IConcept_Complete;

  return <div className="concept-wrapper">
    <article className="concept">
      <section>
        <header><span className="title">{title}</span></header>
        <section className="body">
          <div className="contentType">{contentType}</div>

          <div className="content">{
            (() => {
              switch (contentType) {
                case'text/rich':
                  return <div className="rich-text">{RichText({src})}</div>;
                case'text/text':
                  return <span className="plain">{src}</span>
                default:
                  return <Log>{src}</Log>
              }
            })
            ()
          }
          </div>
          <div style={{border: 'thick solid black', display: 'inline-flex'}}>
            {conceptTags && conceptTags.map(({tag}: IConceptTag_Complete) => <ConceptTag
              tag={tag}
              concept={concept}
            />)}
          </div>
        </section>
      </section>
    </article>
  </div>;
}
export function ConceptDisplay({concept}: ConceptDisplayParams) {
  const {id} = concept as IConcept_Complete;

  return (
    <>
      <DeleteConceptButton id={id}/>
      <ErrorBoundary>
        <Internal concept={concept}/>
      </ErrorBoundary>
    </>
  )
}

/**
 * Displays concepts based on the context
 * @constructor
 */
export function ConceptContextDisplay() {
  const concept = useActiveConcept();
  if (!concept) return null;
  return <ConceptDisplay concept={concept}/>
}