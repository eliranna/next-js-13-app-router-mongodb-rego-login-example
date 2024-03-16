import { useEffect, useState } from "react";
import ChipBar from "./base/ChipBar";
import { ChipItem } from "./base/Chip";
import RunButton from "./base/RunButton";
import { Topic, QuestionTheme, QuestionLevel } from "./QBuilder";
import LevelBar from "./base/LevelBar";
import { CaptionToken, useCaptions } from "_helpers/client/useCaptions";

const TeacherAssistant = ({topics, themes, levels, processing, onGenerateQuestion}: {topics: Topic[], themes: QuestionTheme[], levels: QuestionLevel[], processing: boolean, onGenerateQuestion: any}) => {

    const {getCaption} = useCaptions()

    const [ topicChips, setTopicChips ] = useState<ChipItem[]>([]) 
    const [ levelChips, setLevelChips ] = useState<ChipItem[]>([])
    const [ themeChips, setThemeChips ] = useState<ChipItem[]>([]) 

    useEffect(() => {
      setTopicChips(topics.map((topic) => ({
        id: topic.id,
        caption: topic.caption,
        selected: false
      })))
    }, [topics])

    useEffect(() => {
      setThemeChips(themes.map((theme) => ({
        id: theme.id,
        caption: theme.caption,
        selected: false
      })))
    }, [themes])

    useEffect(() => {
      setLevelChips(levels.map((level) => ({
        id: level.caption,
        caption: level.caption,
        selected: false,
        icon: level.icon
      })))
    }, [levels])

    const onTopicToggle = (chip: ChipItem) => {
      setTopicChips(topicChips.map(ch => {
        if (ch.id === chip.id) {
          return { ...ch, selected: !ch.selected };
        }
        return ch;
    }))}

    const onLevelToggle = (chip: ChipItem) => {
      setLevelChips(levelChips.map(ch => {
        if (ch.id === chip.id) {
          return { ...ch, selected: !ch.selected };
        } else {
          return { ...ch, selected: false };
        }
      }));
    };

    const onThemeToggle = (chip: ChipItem) => {
      setThemeChips(themeChips.map(ch => {
        if (ch.id === chip.id) {
          return { ...ch, selected: !ch.selected };
        }
        return ch;
    }))}

    const handleGenerateQuestion = () => {
      onGenerateQuestion({
        topics: topicChips.filter(chip => chip.selected).map(chip => chip.caption),
        level: levelChips.filter(chip => chip.selected).map(chip => chip.id),
        themes: themeChips.filter(chip => chip.selected).map(chip => chip.caption),
      })
    }

    return (
        <div className="flex flex-col gap-10">

          <div className="flex flex-col gap-8">
            <div className="uppercase text-sm font-semibold text-dark-gray">
              {getCaption('Topics' as CaptionToken)}
            </div>
            <div>
              <ChipBar chips={topicChips} onChipClick={onTopicToggle}/>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="uppercase text-sm font-semibold text-dark-gray">
            {getCaption('Level' as CaptionToken)}
            </div>
            <div>
              <LevelBar chips={levelChips} onChipClick={onLevelToggle}/>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="uppercase text-sm font-semibold text-dark-gray">
            {getCaption('Themes' as CaptionToken)}
            </div>
            <div>
              <ChipBar chips={themeChips} onChipClick={onThemeToggle}/>
            </div>
          </div>

          <div>
            <div className="flex gap-4 flex-col">
              <RunButton processing={processing} onClick={handleGenerateQuestion} icon="/icons/light.svg">
              {getCaption('Generate Question' as CaptionToken)}
              </RunButton>
            </div>
          </div>  


          
            
        </div>
    )
}

export default TeacherAssistant