import { useEffect, useState } from "react";
import ChipBar from "./base/ChipBar";
import { ChipItem } from "./base/Chip";
import RunButton from "./base/RunButton";
import { Topic, QuestionTheme, QuestionLevel } from "./QBuilder";
import LevelBar from "./base/LevelBar";

const TeacherAssistant = ({topics, themes, levels, processing, onGenerateQuestion}: {topics: Topic[], themes: QuestionTheme[], levels: QuestionLevel[], processing: boolean, onGenerateQuestion: any}) => {

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

          <div>
            <div className="flex gap-4 justify-between">
              <RunButton secondary processing={processing} onClick={handleGenerateQuestion} icon="/icons/light.svg">
                Generate Question
              </RunButton>
              <RunButton icon="/icons/check-black.svg">
                Publish
              </RunButton>
            </div>
          </div>          

          <div className="flex flex-col gap-8">
            <div className="uppercase text-sm font-semibold text-dark-gray">
              Topics
            </div>
            <div>
              <ChipBar chips={topicChips} onChipClick={onTopicToggle}/>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="uppercase text-sm font-semibold text-dark-gray">
              Level
            </div>
            <div>
              <LevelBar chips={levelChips} onChipClick={onLevelToggle}/>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="uppercase text-sm font-semibold text-dark-gray">
              Themes
            </div>
            <div>
              <ChipBar chips={themeChips} onChipClick={onThemeToggle}/>
            </div>
          </div>


          
            
        </div>
    )
}

export default TeacherAssistant