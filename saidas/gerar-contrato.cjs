// Gera o contrato de assessoria da LoveMãe em .docx
// Uso: node contrato.cjs <caminho-de-saida> <caminho-do-logo>
const {
  Document, Packer, Paragraph, TextRun, ImageRun, AlignmentType, HeadingLevel,
  BorderStyle, Footer, PageNumber, Table, TableRow, TableCell, WidthType, ShadingType,
} = require('docx');
const fs = require('fs');

const AZUL = '0038E5';
const ROSA = 'C81B5C';
const ESCURO = '1A2530';
const FONTE = 'Arial';

const saida = process.argv[2];
const logo = process.argv[3];

/** Título de cláusula. */
const clausula = (texto) => new Paragraph({
  spacing: { before: 320, after: 140 },
  children: [new TextRun({ text: texto, bold: true, color: AZUL, size: 22, font: FONTE })],
});

/** Parágrafo numerado do corpo (1.1., 4.2. …). */
const item = (texto, opcoes = {}) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 130, line: 276 },
  children: [new TextRun({ text: texto, size: 20, font: FONTE, color: ESCURO, ...opcoes })],
});

/** Parágrafo com trechos em negrito: recebe array de [texto, negrito?]. */
const itemRico = (partes) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 130, line: 276 },
  children: partes.map(([t, b]) => new TextRun({ text: t, bold: !!b, size: 20, font: FONTE, color: ESCURO })),
});

/** Bloco cinza de qualificação das partes. */
const bloco = (rotulo, corpo) => new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { after: 160, line: 276 },
  shading: { type: ShadingType.CLEAR, fill: 'F4F6F8' },
  border: {
    top: { style: BorderStyle.SINGLE, size: 2, color: 'E3E8EC' },
    bottom: { style: BorderStyle.SINGLE, size: 2, color: 'E3E8EC' },
    left: { style: BorderStyle.SINGLE, size: 2, color: 'E3E8EC' },
    right: { style: BorderStyle.SINGLE, size: 2, color: 'E3E8EC' },
  },
  children: [
    new TextRun({ text: rotulo, bold: true, color: ROSA, size: 20, font: FONTE }),
    new TextRun({ text: corpo, size: 20, font: FONTE, color: ESCURO }),
  ],
});

const filhos = [];

// Cabeçalho da primeira página: logo centralizado
filhos.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 200 },
  children: [new ImageRun({
    type: 'png',
    data: fs.readFileSync(logo),
    transformation: { width: 150, height: 116 },
  })],
}));

filhos.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 60 },
  border: { top: { style: BorderStyle.SINGLE, size: 10, color: ROSA, space: 8 } },
  children: [new TextRun({
    text: 'CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE ASSESSORIA',
    bold: true, color: AZUL, size: 26, font: FONTE,
  })],
}));

filhos.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 60 },
  children: [new TextRun({ text: 'SALÁRIO-MATERNIDADE', bold: true, color: ROSA, size: 24, font: FONTE })],
}));

filhos.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 260 },
  children: [new TextRun({
    text: 'Instrumento particular de contratação de assessoria administrativa previdenciária',
    italics: true, size: 18, font: FONTE, color: '5A6672',
  })],
}));

filhos.push(bloco('CONTRATANTE: ',
  '{{NOME COMPLETO}}, {{nacionalidade}}, {{estado civil}}, {{profissão}}, CPF nº {{CPF}}, '
  + 'RG nº {{RG}} – {{órgão emissor}}, residente em {{endereço completo}}, {{Cidade}}/{{UF}}, '
  + 'CEP {{CEP}}, telefone {{telefone}}, e-mail {{e-mail}}.'));

filhos.push(bloco('CONTRATADA: ',
  'LOVEMÃE AUXÍLIO MATERNIDADE, pessoa jurídica de direito privado, inscrita no CNPJ nº '
  + '54.787.995/0001-01, com sede em {{endereço completo da sede}}, {{Cidade}}/{{UF}}, CEP {{CEP}}, '
  + 'e-mail contato@lovemaeauxiliomaternidade.com.br e telefone (11) 97723-8306, neste ato '
  + 'representada por {{representante legal}}, {{nacionalidade}}, {{estado civil}}, {{profissão}}, '
  + 'CPF nº {{CPF do representante}}.'));

filhos.push(new Paragraph({
  alignment: AlignmentType.JUSTIFIED,
  spacing: { before: 120, after: 80 },
  children: [new TextRun({
    text: 'As partes acima identificadas celebram o presente Contrato de Prestação de Serviços de '
      + 'Assessoria Administrativa, mediante as cláusulas e condições seguintes.',
    bold: true, size: 20, font: FONTE, color: ESCURO,
  })],
}));

// ── Cláusula 1
filhos.push(clausula('CLÁUSULA 1 – DO OBJETO'));
filhos.push(item('1.1. O presente contrato tem por objeto a prestação, pela CONTRATADA, de serviços de assessoria administrativa relacionados ao requerimento de salário-maternidade (também conhecido como auxílio-maternidade) perante o Instituto Nacional do Seguro Social (INSS), compreendendo orientação documental, organização das informações fornecidas pela CONTRATANTE, protocolo administrativo quando autorizado e acompanhamento administrativo do requerimento.'));
filhos.push(item('1.2. A atuação da CONTRATADA é de natureza exclusivamente administrativa e não compreende representação judicial, prática de atos privativos da advocacia, emissão de parecer jurídico ou atuação perante o Poder Judiciário.'));
filhos.push(item('1.3. Caso a situação exija medida judicial ou atividade privativa de advogado, a CONTRATANTE será informada para que possa, livremente, constituir profissional habilitado de sua escolha.'));
filhos.push(item('1.4. A análise prévia de elegibilidade é gratuita e não gera qualquer obrigação de contratação para a CONTRATANTE.'));

// ── Cláusula 2
filhos.push(clausula('CLÁUSULA 2 – DAS OBRIGAÇÕES DA CONTRATADA'));
filhos.push(item('2.1. A CONTRATADA compromete-se a prestar as orientações necessárias ao procedimento administrativo, solicitar e organizar documentos, manter a CONTRATANTE informada sobre movimentações relevantes de que tenha conhecimento e atuar com diligência e boa-fé.'));
filhos.push(itemRico([
  ['2.2. A CONTRATADA ', false],
  ['não garante a concessão do benefício', true],
  [', pois a análise, as exigências, os prazos e a decisão competem exclusivamente ao INSS. A prestação contratada constitui obrigação de meio, e não de resultado.', false],
]));
filhos.push(item('2.3. A CONTRATADA informará a CONTRATANTE, por escrito, sobre o indeferimento do pedido e sobre as alternativas disponíveis, inclusive a possibilidade de recurso administrativo.'));

// ── Cláusula 3
filhos.push(clausula('CLÁUSULA 3 – DAS OBRIGAÇÕES DA CONTRATANTE'));
filhos.push(item('3.1. A CONTRATANTE deverá fornecer informações verdadeiras, completas e atualizadas, bem como apresentar os documentos solicitados dentro dos prazos informados.'));
filhos.push(item('3.2. A CONTRATANTE deverá comunicar imediatamente qualquer alteração relevante em seus dados, documentos, situação previdenciária ou andamento do requerimento.'));
filhos.push(item('3.3. A prestação de informação falsa ou a omissão de informação relevante pela CONTRATANTE, que venha a prejudicar o requerimento, constitui justa causa para rescisão pela CONTRATADA.'));

// ── Cláusula 4
filhos.push(clausula('CLÁUSULA 4 – DA REMUNERAÇÃO E DA FORMA DE PAGAMENTO'));
filhos.push(itemRico([
  ['4.1. Pela prestação dos serviços, a CONTRATANTE pagará à CONTRATADA, ', false],
  ['exclusivamente em caso de êxito na concessão do benefício', true],
  [', remuneração correspondente a ', false],
  ['30% (trinta por cento)', true],
  [' dos valores efetivamente recebidos pela CONTRATANTE a título de salário-maternidade.', false],
]));
filhos.push(itemRico([
  ['4.2. Os honorários tornam-se devidos ', false],
  ['com o recebimento da primeira parcela do benefício', true],
  [' pela CONTRATANTE, e deverão ser pagos em até 5 (cinco) dias úteis contados desse recebimento, pelos meios informados pela CONTRATADA.', false],
]));
filhos.push(item('4.3. O salário-maternidade é pago, em regra, em 4 (quatro) parcelas mensais. Quando o pagamento pelo INSS ocorrer de forma parcelada, as partes poderão ajustar por escrito o pagamento dos honorários em parcelas correspondentes, de modo que o valor devido em cada mês não ultrapasse 30% (trinta por cento) do montante efetivamente recebido pela CONTRATANTE naquele mês.'));
filhos.push(item('4.4. Não há cobrança de taxa de adesão, de análise ou de qualquer valor a título de entrada. Nada é devido pela CONTRATANTE caso o benefício não seja concedido.'));
filhos.push(item('4.5. Em caso de atraso de valor líquido e exigível, poderão incidir correção monetária pelo índice legal aplicável, juros de 1% (um por cento) ao mês e multa moratória de 2% (dois por cento) sobre o valor em atraso.'));

// ── Cláusula 5
filhos.push(clausula('CLÁUSULA 5 – DO PROCEDIMENTO ADMINISTRATIVO E DAS EXIGÊNCIAS'));
filhos.push(item('5.1. A CONTRATANTE declara estar ciente de que o INSS poderá solicitar documentos adicionais, realizar exigências, indeferir o pedido ou alterar prazos de análise.'));
filhos.push(item('5.2. Eventuais recursos administrativos somente serão abrangidos por este contrato quando expressamente ajustados entre as partes, por escrito. Medidas judiciais não integram o objeto deste instrumento.'));

// ── Cláusula 6
filhos.push(clausula('CLÁUSULA 6 – DO ACESSO À CONTA GOV.BR / MEU INSS E DA SEGURANÇA'));
filhos.push(itemRico([
  ['6.1. A CONTRATADA ', false],
  ['não solicita, não recebe e não utiliza a senha pessoal da CONTRATANTE', true],
  [' no gov.br ou no Meu INSS, em nenhuma etapa da prestação do serviço.', false],
]));
filhos.push(item('6.2. Sempre que o procedimento exigir autenticação pessoal, a CONTRATANTE realizará o acesso diretamente, ou outorgará procuração eletrônica à CONTRATADA pelos meios oficiais disponibilizados pelo próprio INSS.'));
filhos.push(item('6.3. A CONTRATANTE declara estar ciente de que a senha do gov.br é pessoal e intransferível, e de que não deve compartilhá-la com nenhuma pessoa ou empresa, inclusive com a CONTRATADA.'));
filhos.push(item('6.4. A CONTRATADA não utilizará dados ou documentos da CONTRATANTE para finalidade diversa da execução deste contrato.'));

// ── Cláusula 7
filhos.push(clausula('CLÁUSULA 7 – DA PROTEÇÃO DE DADOS PESSOAIS'));
filhos.push(item('7.1. Os dados pessoais e documentos fornecidos serão utilizados para cadastro, análise, execução e acompanhamento dos serviços contratados, bem como para o cumprimento de obrigações legais e regulatórias, nos termos da Lei nº 13.709/2018 (LGPD).'));
filhos.push(item('7.2. A CONTRATADA adotará medidas razoáveis de segurança e limitará o acesso aos dados às pessoas necessárias à execução do serviço.'));
filhos.push(item('7.3. A CONTRATANTE autoriza o tratamento dos dados estritamente necessário à execução deste contrato e às providências administrativas por ela solicitadas.'));
filhos.push(item('7.4. Os dados serão mantidos pelo prazo de {{prazo de guarda}} após o encerramento do contrato, ou pelo prazo maior exigido por obrigação legal. A CONTRATANTE poderá solicitar acesso, correção ou exclusão dos seus dados pelo e-mail contato@lovemaeauxiliomaternidade.com.br.'));

// ── Cláusula 8
filhos.push(clausula('CLÁUSULA 8 – DA DESISTÊNCIA, DA RESCISÃO E DA MULTA'));
filhos.push(itemRico([
  ['8.1. ', false],
  ['Direito de arrependimento.', true],
  [' Por se tratar de contratação realizada fora do estabelecimento comercial (internet, telefone ou aplicativo de mensagens), a CONTRATANTE poderá desistir do contrato no prazo de ', false],
  ['7 (sete) dias corridos', true],
  [' contados da assinatura, ', false],
  ['sem qualquer ônus ou multa', true],
  [', nos termos do art. 49 do Código de Defesa do Consumidor.', false],
]));
filhos.push(item('8.2. Encerrado o prazo do item 8.1, o contrato poderá ser rescindido por qualquer das partes mediante comunicação por escrito.'));
filhos.push(itemRico([
  ['8.3. ', false],
  ['Multa por desistência no curso do procedimento.', true],
  [' Caso a CONTRATANTE desista do serviço após o prazo do item 8.1 e antes da conclusão do requerimento, sem justa causa imputável à CONTRATADA, será devida multa correspondente a ', false],
  ['30% (trinta por cento) do valor de referência do benefício', true],
  [', assim entendido o equivalente a 4 (quatro) parcelas do salário mínimo nacional vigente na data da desistência.', false],
]));
filhos.push(item('8.4. A multa prevista no item 8.3 destina-se a remunerar as atividades já efetivamente executadas pela CONTRATADA e os custos incorridos até a desistência, e será cobrada uma única vez.'));
filhos.push(itemRico([
  ['8.5. ', false],
  ['Não haverá cobrança de multa', true],
  [' quando: (a) o pedido for indeferido pelo INSS; (b) a análise concluir que a CONTRATANTE não preenche os requisitos do benefício; (c) a rescisão decorrer de descumprimento contratual pela CONTRATADA; (d) a desistência ocorrer dentro do prazo do item 8.1; ou (e) a desistência decorrer de fato alheio à vontade da CONTRATANTE, devidamente comprovado.', false],
]));
filhos.push(item('8.6. A rescisão não prejudicará valores já vencidos e comprovadamente devidos.'));

// ── Cláusula 9
filhos.push(clausula('CLÁUSULA 9 – DAS DISPOSIÇÕES GERAIS'));
filhos.push(item('9.1. A CONTRATANTE declara ter recebido informações claras sobre o objeto, os limites da assessoria, a forma de remuneração e as hipóteses de multa, e ter tido oportunidade de esclarecer dúvidas antes da assinatura.'));
filhos.push(itemRico([
  ['9.2. Nenhuma disposição deste instrumento deverá ser interpretada como ', false],
  ['promessa ou garantia de concessão do benefício', true],
  ['.', false],
]));
filhos.push(item('9.3. Comunicações relacionadas ao serviço poderão ocorrer pelos canais informados pelas partes, inclusive e-mail e aplicativos de mensagens, que as partes reconhecem como meio válido de comunicação.'));
filhos.push(item('9.4. O presente instrumento entra em vigor na data de sua assinatura e obriga as partes e seus sucessores.'));
filhos.push(item('9.5. A eventual invalidade de qualquer cláusula não prejudicará as demais, que permanecerão em pleno vigor.'));

// ── Cláusula 10
filhos.push(clausula('CLÁUSULA 10 – DO FORO'));
filhos.push(item('10.1. Fica eleito o foro do domicílio da CONTRATANTE para dirimir questões decorrentes deste contrato, nos termos do art. 101, inciso I, do Código de Defesa do Consumidor.'));

// ── Assinaturas
filhos.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 460, after: 460 },
  children: [new TextRun({ text: '{{Cidade}}/{{UF}}, {{data completa}}.', bold: true, size: 20, font: FONTE, color: ESCURO })],
}));

const celulaAssinatura = (linhas) => new TableCell({
  width: { size: 4400, type: WidthType.DXA },
  borders: {
    top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
    left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE },
  },
  children: [
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 60 },
      border: { top: { style: BorderStyle.SINGLE, size: 6, color: ESCURO, space: 4 } },
      children: [new TextRun({ text: '', size: 20, font: FONTE })],
    }),
    ...linhas.map((l, i) => new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { after: 40 },
      children: [new TextRun({ text: l, bold: i === 0, size: 18, font: FONTE, color: ESCURO })],
    })),
  ],
});

filhos.push(new Table({
  columnWidths: [4400, 4400],
  width: { size: 8800, type: WidthType.DXA },
  rows: [new TableRow({
    children: [
      celulaAssinatura(['{{NOME DA CONTRATANTE}}', 'CPF: {{CPF}}']),
      celulaAssinatura(['LOVEMÃE AUXÍLIO MATERNIDADE', 'CNPJ: 54.787.995/0001-01', '{{representante legal}}']),
    ],
  })],
}));

filhos.push(new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { before: 400 },
  children: [new TextRun({ text: 'Testemunhas', bold: true, size: 18, font: FONTE, color: '5A6672' })],
}));

filhos.push(new Table({
  columnWidths: [4400, 4400],
  width: { size: 8800, type: WidthType.DXA },
  rows: [new TableRow({
    children: [
      celulaAssinatura(['{{nome}}', 'CPF: {{CPF}}']),
      celulaAssinatura(['{{nome}}', 'CPF: {{CPF}}']),
    ],
  })],
}));

const doc = new Document({
  styles: { default: { document: { run: { font: FONTE, size: 20, color: ESCURO } } } },
  sections: [{
    properties: { page: { margin: { top: 1000, bottom: 1000, left: 1100, right: 1100 } } },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 2, color: 'DDE3E8', space: 6 } },
          children: [
            new TextRun({ text: 'LoveMãe • auxílio maternidade  |  Documento de assessoria administrativa  |  ', size: 15, font: FONTE, color: '8A959E' }),
            new TextRun({ children: [PageNumber.CURRENT], size: 15, font: FONTE, color: '8A959E' }),
            new TextRun({ text: '/', size: 15, font: FONTE, color: '8A959E' }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 15, font: FONTE, color: '8A959E' }),
          ],
        })],
      }),
    },
    children: filhos,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(saida, buf);
  console.log(`gerado: ${saida} (${(buf.length / 1024).toFixed(0)} KB)`);
});
