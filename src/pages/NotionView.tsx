import React from 'react';


const NotionView: React.FC = () =>
    <div style={{color: 'inherit', fill: 'inherit'}}>
        <div style={{display: 'flex'}}>
            <div style={{
                maxWidth: '100%',
                width: '100%',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                caretColor: 'rgb(55, 53, 47)',
                padding: '3px 2px'
            }} contentEditable="true" spellCheck="true" placeholder="Type '/' for commands" data-root="true"
                 className="notranslate">book → title → chapter
            </div>
        </div>
        <div style={{paddingLeft: '1.5em', display: 'flex', flexDirection: 'column'}}>
            <svg viewBox="0 0 10 10" style={{
                width: 14,
                height: 14,
                display: 'block',
                fill: 'inherit',
                flexShrink: 0,
                WebkitBackfaceVisibility: 'hidden'
            }} className="dragHandle">
                <path
                    d="M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z"/>
            </svg>
            <div style={{width: '100%', maxWidth: '100%', marginTop: 2, marginBottom: 1}}
                 data-block-id="f2f5941b-38fd-415f-bb0e-8cf1986be3c9"
                 className="notion-selectable notion-text-block">
                <div style={{color: 'inherit', fill: 'inherit'}}>
                    <div style={{display: 'flex'}}>
                        <div style={{
                            maxWidth: '100%',
                            width: '100%',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            caretColor: 'rgb(55, 53, 47)',
                            padding: '3px 2px'
                        }} contentEditable="true" spellCheck="true" placeholder=" " data-root="true"
                             className="notranslate">podcast → name → episode
                        </div>
                    </div>
                </div>
            </div>
            <div style={{width: '100%', maxWidth: '100%', marginTop: 1, marginBottom: 0}}
                 data-block-id="f8f83b7f-4b58-41ab-aa7d-4029cdfb58e8"
                 className="notion-selectable notion-text-block">
                <div style={{color: 'inherit', fill: 'inherit'}}>
                    <div style={{display: 'flex'}}>
                        <div style={{
                            maxWidth: '100%',
                            width: '100%',
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            caretColor: 'rgb(55, 53, 47)',
                            padding: '3px 2px'
                        }} contentEditable="true" spellCheck="true" placeholder=" " data-root="true"
                             className="notranslate">article → caption
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


export default NotionView
