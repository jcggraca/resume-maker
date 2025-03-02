import { useIntl } from "react-intl"
import { Check, X } from "lucide-react"

export default function Tips() {
  const intl = useIntl()

  return (
    <section style={{ scrollMarginTop: "4rem" }} id="tips">
      <p>
        {intl.formatMessage({ id: "aboutResumeMaker" })}
        <br />
        {intl.formatMessage({ id: "tipsWithoutAI" })}
        <br />
        {intl.formatMessage({ id: "noSellingData" })}
      </p>

      <h2>{intl.formatMessage({ id: "tips" })}</h2>

      <article className="card">
        <h3>
          <Check color="#4ae081" /> {intl.formatMessage({ id: "dos" })}
        </h3>

        <h4>{intl.formatMessage({ id: "dateFormatting" })}</h4>
        <p>{intl.formatMessage({ id: "dateFormattingMessage" })}</p>

        <h4>{intl.formatMessage({ id: "spellCheck" })}</h4>
        <p>{intl.formatMessage({ id: "spellCheckMessage" })}</p>

        <h4>{intl.formatMessage({ id: "onePage" })}</h4>
        <p>{intl.formatMessage({ id: "onePageMessage" })}</p>

        <h4>{intl.formatMessage({ id: "prioritizeRelevant" })}</h4>
        <p>{intl.formatMessage({ id: "prioritizeRelevantMessage" })}</p>

        <h3>
          <X color="#f04d4d" /> {intl.formatMessage({ id: "dont" })}
        </h3>

        <h4>{intl.formatMessage({ id: "noAcronyms" })}</h4>
        <p>{intl.formatMessage({ id: "noAcronymsMessage" })}</p>

        <h4>{intl.formatMessage({ id: "noReferences" })}</h4>
        <p>{intl.formatMessage({ id: "noReferencesMessage" })}</p>
      </article>
    </section>
  )
}