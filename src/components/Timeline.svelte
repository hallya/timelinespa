<script lang="ts">
  // @ts-check
  import { onMount } from 'svelte';
  import type { ProjectEvent, LifeCycleEvent, Markup } from '../types';
  import { maxMonthIndex, months } from '../utils/constants';
  import { randomBackground } from '../utils/style';
  import {
    generateTimelineMarkups,
    generateYearsAndMonthList as generateProjectEventsTimeline,
  } from '../utils/timeline';

  export let startDate: string;
  export let events: ProjectEvent[];
  export let lifeCycles: LifeCycleEvent[];

  const {
    monthIndex: projectStartMonthIndex,
    year: projectStartYear,
  } = generateTimelineMarkups(new Date(startDate));

  const markupsFromEvents = events.map((event) => {
    return {
      ...generateTimelineMarkups(new Date(event.startDate)),
      ...event,
    };
  });
  const markupsFromLifeCyles = lifeCycles.map((lifeCycle) => {
    return {
      ...generateTimelineMarkups(new Date(lifeCycle.startDate)),
      ...lifeCycle,
    };
  });
  const markupToday = generateTimelineMarkups(new Date());

  const timelineStartMonthIndex =
    (projectStartMonthIndex - 2 + maxMonthIndex) % maxMonthIndex;
  const timelineStartYear: number =
    projectStartMonthIndex - 2 < 0
      ? Number(projectStartYear) - 1
      : Number(projectStartYear);
  const timelineEndYear: number = Number(projectStartYear) + 2;

  const {
    monthsToDisplay: monthsToDisplay,
    yearsToDisplay: yearsToDisplay,
  } = generateProjectEventsTimeline(
    timelineStartYear,
    timelineEndYear,
    timelineStartMonthIndex
  );
  function isMatchingPeriod<A extends Markup, B extends Markup>(
    element: A,
    period: B
  ): boolean {
    return (
      element.monthIndex === period.monthIndex &&
      element.weekIndex === period.weekIndex &&
      element.year === period.year
    );
  }

  onMount(() => {
    const scrollXContainerElement = document.querySelector('.scrollXContainer');
    const todayElement = document.querySelector('.today');

    if (todayElement && scrollXContainerElement) {
      const offsetLeft =
        todayElement.getBoundingClientRect().left - window.innerWidth / 3;

      scrollXContainerElement.scrollBy({
        behavior: 'smooth',
        left: offsetLeft,
      });
    }
  });
</script>

<div>
  <div class="horizontalLine" />
  <div class="scrollXContainer">
    {#each yearsToDisplay as year, yearIndex}
      <section
        aria-labelledby={`year-${year}`}
        aria-describedby={`year-${year}-months`}
        class="yearContainer"
      >
        <ul class="months" id={`year-${year}-months`}>
          {#each monthsToDisplay[yearIndex] as month, monthIndex}
            <li class="monthContainer">
              <div class="monthIndicator" />
              <div class="weeksContainer">
                {#each new Array(4) as _, weekIndex}
                  <div class="week">
                    {#if isMatchingPeriod(markupToday, {
                      weekIndex,
                      monthIndex: months.indexOf(month),
                      year,
                    })}
                      <div class="today" />
                    {/if}
                    {#if markupsFromLifeCyles.some((lifeCycle) =>
                      isMatchingPeriod(lifeCycle, {
                        weekIndex,
                        monthIndex: months.indexOf(month),
                        year,
                      })
                    )}
                      <p class="lifeCycleMarker projectLabel fontLight">
                        {markupsFromLifeCyles.find((lf) =>
                          isMatchingPeriod(lf, {
                            weekIndex,
                            monthIndex: months.indexOf(month),
                            year,
                          })
                        )?.name}
                      </p>
                    {/if}
                    {#if markupsFromEvents.some((event) =>
                      isMatchingPeriod(event, {
                        weekIndex,
                        monthIndex: months.indexOf(month),
                        year,
                      })
                    )}
                      <ul class="eventMarker">
                        {#each markupsFromEvents.filter((event) =>
                          isMatchingPeriod(event, {
                            weekIndex,
                            monthIndex: months.indexOf(month),
                            year,
                          })
                        ) as markupEvent}
                          <li class={`event ${randomBackground()}`}>
                            <a class="link" href={markupEvent.assetSrc}>
                              {markupEvent.name}
                            </a>
                          </li>
                        {/each}
                      </ul>
                    {/if}
                  </div>
                {/each}
              </div>
              <p class="month fontLight">{month}</p>
            </li>
          {/each}
        </ul>
        <p class="year fontLight" id={`year-${year}`}>
          {year}
        </p>
      </section>
    {/each}
  </div>
</div>

<style>
  .horizontalLine {
    background-color: black;
    bottom: 180px;
    height: 1px;
    position: fixed;
    left: 0;
    right: 0;
  }

  .scrollXContainer {
    bottom: 0;
    display: grid;
    grid-auto-flow: column;
    height: 100vh;
    overflow-x: scroll;
    overflow-y: hidden;
    position: fixed;
    scroll-behavior: smooth;
    width: 100vw;
  }

  .yearContainer {
    align-items: flex-end;
    display: flex;
    justify-content: flex-end;
    flex-direction: column;
    padding: 0;
    margin: 0;
  }

  .year {
    align-self: flex-end;
    color: rgba(0, 0, 0, 0.1);
    font-size: 2rem;
    left: 20px;
    letter-spacing: 4px;
    margin: 0 auto 20px 20px;
    padding-left: 0;
    position: sticky;
    text-align: left;
    bottom: 20px;
  }

  .months {
    align-items: flex-end;
    display: grid;
    grid-auto-flow: column;
    bottom: 102.5px;
    position: relative;
  }

  .monthContainer {
    font-size: 0.8rem;
    height: 20px;
    position: relative;
    width: 70vw;
  }

  .monthIndicator {
    border-left: 1px solid black;
    height: 40px;
    left: 0;
    position: absolute;
    top: -20px;
  }

  .weeksContainer {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .week {
    border-left: 1px solid black;
    flex: 1;
    height: 15px;
    position: relative;
    top: -7.5px;
  }

  .today {
    background-color: rgb(131, 144, 151);
    position: relative;
    left: -1px;
    bottom: calc(100vh - 188px);
    height: 100vh;
    width: 2px;
  }

  .lifeCycleMarker {
    border-left: 1px solid black;
    height: 22px;
    left: -1px;
    padding: 100px 0 0 5px;
    position: absolute;
    top: 0;
  }
  .eventMarker {
    border-left: 1px solid rgba(0, 0, 0, 0.2);
    bottom: 0;
    display: grid;
    row-gap: 10px;
    left: -1px;
    padding: 0 0 60px 0;
    position: absolute;
  }

  .event {
    align-items: center;
    border-radius: 50%;
    color: white;
    display: flex;
    font-size: 1.1rem;
    height: 40px;
    justify-content: center;
    left: -20px;
    position: relative;
    width: 40px;
  }
  .event:focus {
    outline: none;
  }

  .link {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .month {
    left: 0;
    margin: 0;
    padding: 5px 5px 0;
    position: absolute;
    text-align: left;
    top: 0;
  }

  .projectLabel {
    font-size: 1.1rem;
    letter-spacing: 2px;
    width: max-content;
  }

  .bg-1 {
    background-color: rgb(94, 94, 94);
  }
  .bg-1:active {
    background-color: rgb(78, 78, 78);
  }
  .bg-2 {
    background-color: rgb(75, 54, 30);
  }
  .bg-2:active {
    background-color: rgb(47, 34, 19);
  }
  .bg-3 {
    background-color: rgb(47, 77, 47);
  }
  .bg-3:active {
    background-color: rgb(38, 63, 38);
  }
  .bg-4 {
    background-color: rgb(46, 54, 77);
  }
  .bg-4:active {
    background-color: rgb(35, 41, 58);
  }

  @media screen and (min-width: 728px) {
    .monthContainer {
      width: 20vw;
    }
  }
  @media screen and (min-width: 1400px) {
    .horizontalLine {
      bottom: 195px;
    }
  }
</style>
